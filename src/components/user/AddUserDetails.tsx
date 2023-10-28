"use client";
import { trpc } from "@/app/_trpc/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editUserSchema } from "@/lib/types/user";
import { z } from "zod";
import { addUserDetails } from "@/app/validators/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Badge } from "../ui/badge";
type Input = z.infer<typeof editUserSchema>;

const AddUserDetails = () => {
  const utils = trpc.useUtils();
  const { data: user, isLoading } = trpc.userRouter.getUser.useQuery();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: updateUser, isLoading: updateUserLoading } =
    trpc.userRouter.updateUser.useMutation({
      onSuccess: () => {
        utils.userRouter.getUser.invalidate();
        toast({
          title: "Benutzer erfolgreich angelegt",
          description: `Du wirst gleich weitergeleitet.`,
          variant: "default",
        });
        router.push("/company");
      },
    });

  const form = useForm<Input>({
    resolver: zodResolver(addUserDetails),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  return (
    <div className="py-10">
      <div className="mx-auto flex max-w-sm flex-col items-center">
        <div className="mx-auto flex items-center gap-2 rounded-full bg-white px-8 py-2 text-sm text-gray-600 shadow ring-1 ring-inset ring-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-400">
          Angemeldet mit: {user?.email || <Skeleton className="h-5 w-40" />}
        </div>
        <Badge variant="secondary" className="mb-2 mt-8">
          Schritt 1: Benutzerprofil
        </Badge>
        <Progress className="mt-1 h-2" value={33} />
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <h1 className="text-center text-2xl font-bold lg:text-4xl">
            Willkommen bei talentstark.
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Du hast dich für eine ausgezeichnete Lösung im HR & Recruiting
            Bereich entschieden. Um starten zu können richten wir nun gemeinsam
            deinen Account ein. Dies dauert ungefähr eine Minute.
          </p>
        </div>
        <div className="">
          <Card className="mx-auto mt-8 w-full max-w-md">
            <CardHeader>
              <CardTitle>Vervollständige dein Profil</CardTitle>
              <CardDescription>
                Uns fehlen noch ein paar Informationen zu deinem Account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => updateUser(data))}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vorname</FormLabel>
                        <FormControl>
                          <Input placeholder="Max" {...field} />
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
                        <FormLabel>Nachname</FormLabel>
                        <FormControl>
                          <Input placeholder="Muster" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-center">
                    <Button type="submit" className="w-full">
                      {updateUserLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        "Speichern und weiter"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddUserDetails;
