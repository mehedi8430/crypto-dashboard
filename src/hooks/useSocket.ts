/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";

// Types
export interface SocketConfig {
  options?: {
    autoConnect?: boolean;
    reconnection?: boolean;
    reconnectionAttempts?: number;
    reconnectionDelay?: number;
  };
}

export interface SocketEventConfig {
  event: string;
  errorEvent?: string; // Optional custom error event name
  onData?: (data: any) => void; // Optional custom data handler
  onError?: (error: any) => void; // Optional custom error handler
}

export interface UseSocketReturn<T = any> {
  socket: Socket | null;
  isConnected: boolean;
  connectionStatus: "disconnected" | "connected" | "error" | "connecting";
  error: string | null;
  data: T | null;
  loading: boolean;
  emit: (event: string, data?: any) => void;
  disconnect: () => void;
  reconnect: () => void;
  clearError: () => void;
  clearData: () => void;
}

export function useSocket<T = any>(
  config: SocketConfig,
  eventConfig: SocketEventConfig
): UseSocketReturn<T> {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<
    "disconnected" | "connected" | "error" | "connecting"
  >("disconnected");

  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Use ref to store the socket instance to avoid stale closures
  const socketRef = useRef<Socket | null>(null);

  // Memoize the socket URL and config to prevent unnecessary re-renders
  const socketUrl = import.meta.env.VITE_APP_SOCKET_URL;

  const socketOptions = useRef({
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    ...config.options,
  });

  // Memoized connection event handlers
  const handleConnect = useCallback(() => {
    console.log("Connected to socket server");
    setConnectionStatus("connected");
    setError(null);
  }, []);

  const handleDisconnect = useCallback(() => {
    console.log("Disconnected from socket server");
    setConnectionStatus("disconnected");
    setLoading(false);
  }, []);

  const handleConnectError = useCallback((err: Error) => {
    console.error("Connection error:", err);
    setError("Failed to connect to socket server");
    setConnectionStatus("error");
    setLoading(false);
  }, []);

  // Data event handler - memoized with stable reference
  const handleDataEvent = useCallback(
    (responseData: any) => {
      console.log(`${eventConfig.event}:`, responseData);
      setLoading(false);

      if (eventConfig.onData) {
        eventConfig.onData(responseData);
      } else {
        // Default behavior: extract data from response
        setData(responseData?.data || responseData);
      }
    },
    [eventConfig.event, eventConfig.onData]
  );

  // Error event handler - memoized with stable reference
  const handleErrorEvent = useCallback(
    (errorData: any) => {
      const errorMessage = `Error in ${eventConfig.event}: ${
        errorData?.message || "Unknown error"
      }`;
      console.error(errorMessage, errorData);
      setLoading(false);

      if (eventConfig.onError) {
        eventConfig.onError(errorData);
      } else {
        setError(errorMessage);
      }
    },
    [eventConfig.event, eventConfig.onError]
  );

  // Initialize socket connection
  useEffect(() => {
    if (!socketUrl) {
      const errMsg =
        "Socket URL must be provided in config or as REACT_APP_SOCKET_URL environment variable";
      console.error(errMsg);
      setError(errMsg);
      setConnectionStatus("error");
      return;
    }

    setConnectionStatus("connecting");

    // Create socket instance INSIDE useEffect
    const socketInstance = io(socketUrl, socketOptions.current);

    socketRef.current = socketInstance;
    setSocket(socketInstance);

    // Connection events
    socketInstance.on("connect", handleConnect);
    socketInstance.on("disconnect", handleDisconnect);
    socketInstance.on("connect_error", handleConnectError);

    // Data event listener
    socketInstance.on(eventConfig.event, handleDataEvent);

    // Error event listener (auto-generate error event name if not provided)
    const errorEventName =
      eventConfig.errorEvent || `${eventConfig.event}_error`;
    socketInstance.on(errorEventName, handleErrorEvent);

    // Cleanup function
    return () => {
      if (socketInstance) {
        socketInstance.removeAllListeners();
        socketInstance.disconnect();
      }
      setSocket(null);
      socketRef.current = null;
      setConnectionStatus("disconnected");
      setLoading(false);
    };
  }, [
    socketUrl,
    eventConfig.event,
    eventConfig.errorEvent,
    handleConnect,
    handleDisconnect,
    handleConnectError,
    handleDataEvent,
    handleErrorEvent,
  ]);

  // Utility functions
  const emit = useCallback((event: string, data?: any) => {
    if (socketRef.current && socketRef.current.connected) {
      setLoading(true);
      setError(null);
      socketRef.current.emit(event, data);
    } else {
      console.warn("Socket not connected. Cannot emit event:", event);
      setError("Socket not connected");
    }
  }, []);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }
  }, []);

  const reconnect = useCallback(() => {
    if (socketRef.current) {
      setError(null);
      socketRef.current.connect();
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearData = useCallback(() => {
    setData(null);
  }, []);

  return {
    socket,
    isConnected: connectionStatus === "connected",
    connectionStatus,
    error,
    data,
    loading,
    emit,
    disconnect,
    reconnect,
    clearError,
    clearData,
  };
}
