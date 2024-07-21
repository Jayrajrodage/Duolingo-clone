import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import React from "react";

export const SidebarBottem = () => {
  return (
    <div className="flex justify-end p-5 bottom-2 right-2">
      <ClerkLoading>
        <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
      </ClerkLoading>
      <ClerkLoaded>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: { userButtonPopoverCard: { pointerEvents: "initial" } },
          }}
        />
      </ClerkLoaded>
    </div>
  );
};
