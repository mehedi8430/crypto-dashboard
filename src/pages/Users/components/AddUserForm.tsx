/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useRegister } from "@/queries/authQueries";

const userImages = [
  "https://i.ibb.co/jPWwK4hG/5864188-1.png",
  "https://i.ibb.co/fYYnTXR0/5864188.png",
  "https://i.ibb.co/vvqCyX6Y/5864188-4.png",
  "https://i.ibb.co/jkKtDKWJ/5864188-3.png",
  "https://i.ibb.co/nqxx12G2/5864188-2.png",
  "https://i.ibb.co/RkrCphLx/photo-2022-02-28-00-35-30-1024x1024.png",
  "https://i.ibb.co/1DszX8q/0x0-1.png",
  "https://i.ibb.co/7x3kcfvF/cute-detective-bear-cartoon-character-138676-2911.png",
  "https://i.ibb.co/3gKgdkV/cdb7d8e432b1742585aa24c498e65ecc.png",
  "https://i.ibb.co/3mqH2LWM/1-23-3-17-16-2-13m.png",
];

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["USER", "ADMIN"]),
  img: z.string().min(1, "Image is required"),
});

export default function AddUserForm({ onClose }: { onClose: () => void }) {
  const { mutate: createUser, isPending } = useRegister();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "USER",
      img: userImages[0],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createUser(values);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-md rounded-lg bg-card p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Add New User</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USER">User</SelectItem>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="img"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2 overflow-x-scroll">
                      {userImages.map((image) => (
                        <img
                          key={image}
                          src={image}
                          alt="user avatar"
                          className={`h-12 w-12 cursor-pointer rounded-full object-cover ring-2 ${
                            field.value === image
                              ? "ring-primary"
                              : "ring-transparent"
                          }`}
                          onClick={() => field.onChange(image)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? "Adding User..." : "Add User"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
