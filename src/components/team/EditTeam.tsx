"use client";
import { trpc } from "@/app/_trpc/client";
import { editTeamSchema } from "@/app/validators/team";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Skeleton } from "../ui/skeleton";
import { toast } from "../ui/use-toast";
import { useEffect } from "react";

interface TeamProps {
  id: string;
}

type Input = z.infer<typeof editTeamSchema>;
const EditTeam = ({ id }: TeamProps) => {
  const { data: team } = trpc.teamRouter.getTeam.useQuery({ id: id });

  const utils = trpc.useUtils();
  const form = useForm<Input>({
    resolver: zodResolver(editTeamSchema),
  });
  const { mutate: editTeamName, isLoading } =
    trpc.teamRouter.editTeam.useMutation({
      onSuccess: () => {
        utils.teamRouter.getTeam.invalidate();
        toast({
          title: "Team aktualisiert",
        });
      },
      onError: () => {
        utils.teamRouter.getTeam.invalidate();
        toast({
          title: "Es ist ein Fehler aufgetreten.",
          variant: "destructive",
        });
      },
    });

  console.log(form.watch());
  useEffect(() => {
    const setInitalValues = async () => {
      form.setValue("id", team?.team.id as string);
      form.setValue("name", team?.team.name as string);
    };
    setInitalValues();
  }, [team?.team]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="inline-block cursor-pointer px-2">
          <Settings className="h-4 w-4" />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{team?.team.name}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => editTeamName(data))}
            className="mt-8 space-y-3"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teamname</FormLabel>
                  <FormControl>
                    {team?.team.name ? (
                      <Input {...field} />
                    ) : (
                      <Skeleton className="h-10 w-full" />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <SheetClose className="block w-full">
                <Button type="button" className="w-full" variant={"outline"}>
                  Abbrechen
                </Button>
              </SheetClose>
              <Button type="submit" className="w-full">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Speichern"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditTeam;
