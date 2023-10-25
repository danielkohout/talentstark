import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, User } from "lucide-react";
import { LoginButton } from "./ui/authButtons";
import { Button } from "./ui/button";
const UserToggle = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" size="icon">
          <User className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
          <span className="sr-only">User Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>
          <LoginButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserToggle;
