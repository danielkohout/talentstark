"use client";
import { ModeToggle } from "@/components/DarkModeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { loginUserSchema } from "@/validators/user";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Loader2 } from "lucide-react";
const LoginForm = () => {
  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
    },
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const onSubmit = (data: z.infer<typeof loginUserSchema>) => {
    setLoading(true);
    signIn("email", {
      email: data.email,
      callbackUrl: callbackUrl,
    });
  };
  return (
    <div className="min-w-screen flex min-h-screen flex-col justify-between px-6 lg:px-8">
      <div className="flex justify-between p-4">
        <h1 className="font-bold">talentstark.</h1>
        <ModeToggle />
      </div>
      <div className="min-w-full">
        <Card className="mx-auto max-w-sm text-center">
          <CardHeader className="text-center">
            <CardTitle>Jetzt starten</CardTitle>
            <CardDescription>
              In wenigen Sekunden erhalätst du eine Mail mit deiner Anmeldung.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => onSubmit(data))}
                className="space-y-4 text-center"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Öffne die besätitguns E-Mail <br /> auf diesem Gerät.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Anmelden"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center gap-1 text-xs">
        <Link target="_blank" href={"https://talentstark.de/impressum"}>
          Impressum
        </Link>
        <Link target="_blank" href={"https://talentstark.de/datenschutz"}>
          Datenschutz
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
