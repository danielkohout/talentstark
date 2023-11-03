import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { buttonVariants } from "../ui/button";
import { Link2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { updateLink } from "@/validators/team";

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
import { trpc } from "@/app/_trpc/client";

interface TeamLinkProps {
  params: {
    id: string;
  };
}

const TeamLink = ({ params }: TeamLinkProps) => {
  const utils = trpc.useUtils();
  const { mutate: updateTeamSlug } = trpc.teamRouter.updateTeamSlug.useMutation(
    {
      onSuccess: () => {
        utils.teamRouter.invalidate();
      },
    }
  );
  // 1. Define your form.
  const form = useForm<z.infer<typeof updateLink>>({
    resolver: zodResolver(updateLink),
    defaultValues: {
      id: params.id,
      link: "",
    },
  });
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          variant: "default",
          size: "sm",
          className: "mt-2",
        })}
      >
        <Link2 className="mr-2 h-4 w-4" />
        Jetzt Link erstellen
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mach dein Team sichtbar!</DialogTitle>
          <DialogDescription>
            Vergib einen Link, so kannst du alle Jobs des Teams öffentlich
            teilen.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => updateTeamSlug(data))}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Link</FormLabel>
                  <FormControl>
                    <Input placeholder={"dein-link-zum-team"} {...field} />
                  </FormControl>
                  <FormDescription>
                    Bitte beachte, dein Link darf keine Leerzeichen, Umlaute
                    oder Sonderzeichen enthalten.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Speichern</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TeamLink;
