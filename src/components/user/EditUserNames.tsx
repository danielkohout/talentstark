"use client";

import { trpc } from "@/app/_trpc/client";
import { editUserNamesSchema } from "@/validators/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const EditUserNames = () => {
  const { data: user } = trpc.userRouter.getUser.useQuery();

  useEffect(() => {
    const getDefaultValues = async () => {
      if (user?.firstName && user?.lastName) {
        form.setValue("firstName", user.firstName);
        form.setValue("lastName", user.lastName);
      }
    };
    getDefaultValues();
  }, [user]);

  const { mutate: editUserNames, isLoading } =
    trpc.userRouter.updateUser.useMutation({
      onSuccess: () => {
        toast({
          title: "Nutzer wurde erfolgreich geändert",
          description: "Deine neuen Nutzerdaten stehen jetzt bereit.",
        });
      },
    });
  const form = useForm<z.infer<typeof editUserNamesSchema>>({
    resolver: zodResolver(editUserNamesSchema),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Namen</CardTitle>
        <CardDescription>Ändere deinen Vor- und Nachnamen.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => editUserNames(data))}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vorname</FormLabel>
                    <FormControl>
                      {user?.firstName ? (
                        <Input placeholder="Vorname" {...field} />
                      ) : (
                        <Skeleton className="h-10 w-full" />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vorname</FormLabel>
                    <FormControl>
                      {user?.lastName ? (
                        <Input placeholder="Nachname" {...field} />
                      ) : (
                        <Skeleton className="h-10 w-full" />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button disabled={isLoading} type="submit">
                {isLoading ? <Loader2 className="h-4 w-4 " /> : "Speichern"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditUserNames;
