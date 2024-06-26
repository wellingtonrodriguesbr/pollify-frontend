"use client";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Dialog } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowRight, Loader2, LogOut } from "lucide-react";
import { useGetProfile } from "@/hooks/use-get-profile";
import { usePathname } from "next/navigation";
import { useLocalStorage } from "react-use";
import { useSignOut } from "@/hooks/use-sign-out";

export function AccountMenu() {
  const path = usePathname();
  const [_, setAccessToken] = useLocalStorage("accessToken");

  const { profile } = useGetProfile();
  const { signOut, isPending } = useSignOut();

  async function handleSignOut() {
    await signOut();
    setAccessToken("");
    window.location.href = "/";
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="border cursor-pointer">
            <AvatarImage src="" alt="" />
            <AvatarFallback className="text-xs font-bold">
              {profile?.name.at(0)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            <span>{profile?.name}</span>
            <span className="text-xs font-normal text-muted-foreground">
              {profile?.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {path === "/" ? (
            <DropdownMenuItem asChild>
              <Link
                href="/enquetes"
                className="font-medium flex items-center justify-between hover:bg-zinc-100 rounded-sm cursor-pointer"
              >
                Enquetes
                <ArrowRight className="size-3" />
              </Link>
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem asChild>
            <button
              disabled={isPending}
              className="w-full disabled:opacity-45 text-rose-500 hover:text-rose-600 hover:bg-rose-100/40 cursor-pointer font-medium rounded-sm"
              onClick={handleSignOut}
            >
              {isPending ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  <LogOut className="mr-2 w-4 h-4" />
                  <span>Sair</span>
                </>
              )}
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Dialog>
  );
}
