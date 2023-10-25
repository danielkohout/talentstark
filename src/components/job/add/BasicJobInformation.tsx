"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  addJob: (formData: FormData) => void;
}

const BasicJobInformation = ({ addJob }: Props) => {
  return (
    <form action={addJob}>
      <Input type="text" name="jobName" required/>
      <div className="flex justify-center">
        <Button className="mt-2">Diesen Job anlegen</Button>
      </div>
    </form>
  );
};

export default BasicJobInformation;
