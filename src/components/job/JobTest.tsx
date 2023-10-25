"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { trpc } from "@/app/_trpc/client";

const JobTest = () => {
  const [text, setText] = useState("");
  const { mutate: hello } = trpc.jobRouter.hello.useMutation();
  return (
    <div className="max-w-lg mx-auto mt-8">
      <Input onChange={(e) => setText(e.target.value)} />
      <Button onClick={() => hello({ text: text })} className="mt-2">
        Senden
      </Button>
    </div>
  );
};

export default JobTest;
