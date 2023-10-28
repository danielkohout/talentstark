"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Store } from "lucide-react";

import { addTeamSchema } from "@/app/validators/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { trpc } from "@/app/_trpc/client";
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
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
type Input = z.infer<typeof addTeamSchema>;

const TeamSetup = () => {
  const utils = trpc.useUtils();
  const router = useRouter();
  const { mutate: addTeam, isLoading } = trpc.teamRouter.addTeam.useMutation({
    onSuccess: () => {
      utils.userRouter.getUser.invalidate();
      router.push("/");
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
    <div className="mx-auto max-w-7xl px-6 md:px-8">
      <Card className="mx-auto mt-8 max-w-sm">
        <CardHeader>
          <CardTitle>Lege ein Team an</CardTitle>
          <CardDescription>
            Dein Teamname kann später bearbeitet werden.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => addTeam(data))}
              className="space-y-4"
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
                </AlertDescription>
              </Alert>
              <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading ? <Loader2 className="h-4 w-4" /> : "Team anlegen"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamSetup;
