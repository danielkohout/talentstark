"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const AddTeamForm = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const utils = trpc.useUtils();
  const { data: company } = trpc.companyRouter.getCompany.useQuery();
  const addTeam = trpc.teamRouter.addTeam.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      utils.teamRouter.getTeams.invalidate();
      setLoading(false);
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Team erstellen {JSON.stringify(loading)}
          <ArrowRight className="w-5 h-5 ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Team erstellen</DialogTitle>
          <DialogDescription>Erstelle jetzt ein Team.</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            className="col-span-3"
            name="name"
            required
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Unternehmen
          </Label>
          <Input
            disabled
            id="username"
            defaultValue={company?.name}
            className="col-span-3"
          />
        </div>
        <DialogClose asChild>
          <Button
            onClick={async () => {
              addTeam.mutate({ teamName });
            }}
          >
            Erstellen
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default AddTeamForm;
