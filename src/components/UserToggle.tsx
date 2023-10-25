import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { LoginButton } from "./ui/authButtons";
import { Button } from "./ui/button";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";
const UserToggle = () => {
  const { data: user } = trpc.userRouter.getUser.useQuery();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="icon">
          <User className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
          <span className="sr-only">User Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {user?.firstName} {user?.lastName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/user/details"}>Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/user/details"}>Firma</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/user/details"}>Rechnungen</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Link href={"/user/details"}>Support</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LoginButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserToggle;