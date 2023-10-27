"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editUserSchema } from "@/lib/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Skeleton } from "../ui/skeleton";
import { toast } from "../ui/use-toast";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
const EditUserDetails = () => {
  const utils = trpc.useUtils();
  const { data: user, isLoading } = trpc.userRouter.getUser.useQuery();
  const { mutate: editUser } = trpc.userRouter.updateUser.useMutation({
    onSuccess: () => {
      toast({
        title: "Nutzer erfolgreich aktualisiert!",
        description: "Dein Nutzer wurde erfolgreich aktualisiert!",
      });
      utils.userRouter.invalidate();
      reset();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<editUserSchema>({
    resolver: zodResolver(editUserSchema),
  });

  return (
    <div className="mx-auto my-8 max-w-7xl px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <div className="mx-auto flex items-center gap-2 rounded-full bg-white px-8 py-2 text-sm text-gray-600 shadow ring-1 ring-inset ring-gray-200 dark:bg-gray-900 dark:text-gray-400">
          Angemeldet mit: {user?.email || <Skeleton className="h-5 w-40" />}
        </div>
        <h1 className="mx-auto mt-8 max-w-sm text-center text-2xl font-bold">
          Hallo {user?.firstName}, hier kannst du die Informationen zu deinem
          User bearbeiten.
        </h1>
      </div>
      <form
        onSubmit={handleSubmit((data) => editUser(data))}
        className="mx-auto mt-8 max-w-sm space-y-2"
      >
        <div>
          <Label>Vorname</Label>
          {user?.firstName ? (
            <Input {...register("firstName")} defaultValue={user?.firstName} />
          ) : (
            <Skeleton className="h-10 w-full" />
          )}
          {errors.firstName && (
            <Alert className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Fehler</AlertTitle>
              <AlertDescription>{errors.firstName.message}</AlertDescription>
            </Alert>
          )}
        </div>
        <div>
          <Label>Nachname</Label>
          {user?.lastName ? (
            <Input {...register("lastName")} defaultValue={user?.lastName} />
          ) : (
            <Skeleton className="h-10 w-full" />
          )}
          {errors.lastName && (
            <Alert className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Fehler</AlertTitle>
              <AlertDescription>{errors.lastName.message}</AlertDescription>
            </Alert>
          )}
        </div>
        <div className="flex justify-center">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Speichern"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUserDetails;
