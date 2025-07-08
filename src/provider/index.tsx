import { routes } from "@/routes/Router";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

export default function Providers() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// import { BrowserRouter } from "react-router";

// export default function Providers() {
//   return (
//     <SocketProvider userId={currentUser?.id as string}>
//       <Provider store={store}>
//         <PersistGate loading={null} persistor={persistor}>
//           <BrowserRouter>
//             <AppRoutes />
//           </BrowserRouter>
//         </PersistGate>
//       </Provider>
//     </SocketProvider>
//   );
// }
