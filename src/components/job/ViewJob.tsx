"use client";

import { trpc } from "@/app/_trpc/client";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";

const ViewJob = () => {
  const [propmt, setPropmt] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const { mutate: gerateBriefingAI, isLoading } =
    trpc.jobRouter.generateBriefingAI.useMutation({
      onSuccess: (result) => {
        setMessage(result?.choices[0].message.content || null);
      },
    });
  return (
    <div className="mx-auto my-8 max-w-7xl px-6 lg:px-8">
      <Input value={propmt} onChange={(e) => setPropmt(e.target.value)} />
      <Button onClick={() => gerateBriefingAI({ prompt: propmt })}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Briefing"}
      </Button>
      {message &&
        message
          .split("\n")
          .map((line, index) => <p key={index}>{line}</p>)}{" "}
    </div>
  );
};

export default ViewJob;
