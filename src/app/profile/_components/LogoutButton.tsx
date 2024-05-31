"use client";

import { Button } from "@/components/Button";
import { logout } from "../actions";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const { replace } = useRouter();

  function handleLogout() {
    logout();

    replace("/");
  }

  return (
    <Button
      onClick={handleLogout}
      className="text-white absolute right-6 top-6 font-semibold"
    >
      Logout
    </Button>
  );
}
