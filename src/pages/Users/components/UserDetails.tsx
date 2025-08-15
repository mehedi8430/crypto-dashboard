import { useSingleUser } from "@/queries/userQueries";
import { DialogWrapper } from "@/components/DialogWrapper";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

type TUserDetails = {
  id: string;
  email: string;
  fullName: string;
  createdAt: string;
  role: "ADMIN" | "USER";
  img: string;
  status: boolean;
};

interface UserDetailsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export default function UserDetails({
  isOpen,
  onOpenChange,
  userId,
}: UserDetailsProps) {
  const { data: user, isPending } = useSingleUser(userId);

  if (isPending) {
    return (
      <DialogWrapper
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="User Details"
      >
        <div className="text-center">Loading...</div>
      </DialogWrapper>
    );
  }

  if (!user?.data) {
    return (
      <DialogWrapper
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="User Details"
      >
        <div className="text-center text-red-500">User not found</div>
      </DialogWrapper>
    );
  }

  console.log("user", user?.data);

  const userData: TUserDetails = {
    id: user.data.id,
    email: user.data.email,
    fullName: user.data.fullName,
    createdAt: user.data.createdAt,
    role: user.data.role,
    img: user.data.img,
    status: user.data.isStatus,
  };

  const isValidDate = (dateString: string): boolean => {
    if (!dateString) return false;
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };

  return (
    <DialogWrapper
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="User Details"
    >
      <div className="space-y-6 p-4">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <img
            src={userData.img}
            alt="user avatar"
            className="h-32 w-32 rounded-full object-cover border border-border"
          />
        </div>

        {/* User Information */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Full Name</span>
            <span>{userData.fullName}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Email</span>
            <span>{userData.email}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Role</span>
            <span>{userData.role}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Status</span>
            <Badge variant={userData.status ? "default" : "destructive"}>
              {userData.status ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Created At</span>
            <span>
              {isValidDate(userData.createdAt)
                ? format(new Date(userData.createdAt), "PPP")
                : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </DialogWrapper>
  );
}
