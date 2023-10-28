"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Loader2, Store, Terminal, UserPlus2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addTeamSchema } from "@/app/validators/team";

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
import { trpc } from "@/app/_trpc/client";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";
type Input = z.infer<typeof addTeamSchema>;

const AddTeam = () => {
  const utils = trpc.useUtils();
  const { mutate: addTeam, isLoading } = trpc.teamRouter.addTeam.useMutation({
    onSuccess: () => {
      utils.userRouter.getUser.invalidate();
      form.reset();
    },
  });
  const { data: user } = trpc.userRouter.getUser.useQuery();

  const form = useForm<Input>({
    resolver: zodResolver(addTeamSchema),
    defaultValues: {
      name: "",
    },
  });
  return (
    <Sheet>
      <SheetTrigger
        className={buttonVariants({
          variant: "default",
        })}
      >
        Team erstellen
        <UserPlus2 className="ml-1 h-4 w-4" />
      </SheetTrigger>
      <SheetContent side={"right"}>
        <SheetHeader>
          <SheetTitle>Erstelle ein neues Team</SheetTitle>
          <SheetDescription>
            Teams sind in talentstark sehr flexibel. Teams können Abteilungen,
            Standorte oder eigene Ideen zur Strukturierung von Jobs sein.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => addTeam(data))}
            className="mt-6 space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team</FormLabel>
                  <FormControl>
                    <Input placeholder="Vertrieb" {...field} />
                  </FormControl>
                  <FormDescription>
                    Der Teamname kann später geändert werden.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Alert>
              <Store className="h-4 w-4" />
              <AlertTitle>
                {user?.company?.name || <Skeleton className="h-8 w-full" />}
              </AlertTitle>
              <AlertDescription>
                Dieses Team wird automatisch deinem Unternehmen zugeordnet.
                <span className="block pt-2 text-xs">
                  Dein Unternehmen kannst du unter{" "}
                  <Link className="text-blue-500 underline" href={"/account"}>
                    Einstellungen
                  </Link>{" "}
                  anpassen.
                </span>
              </AlertDescription>
            </Alert>
            <SheetFooter>
              <SheetClose>
                <Button disabled={isLoading} type="submit">
                  {isLoading ? <Loader2 className="h-4 w-4" /> : "Team anlegen"}
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default AddTeam;
