import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IonImg } from "@ionic/react";
import { Browser } from "@capacitor/browser";

export const Header = () => {
  const { user } = useUser();
  return (
    <header className="h-20 w-full border-b-2 border-slate-200 px-4">
      <>
        <div className="mx-auto flex h-full items-center justify-between lg:max-w-screen-lg">
          <a href="/" className="flex items-center gap-x-3 pb-7 pl-4 pt-8">
            <IonImg
              src="/mascot.svg"
              alt="Mascot"
              className="h-[40px] w-[40px]"
            />

            <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
              Lingo
            </h1>
          </a>

          <div className="flex gap-x-3">
            <ClerkLoading>
              <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              <SignedOut>
                <SignInButton
                  mode="modal"
                  forceRedirectUrl="/learn"
                  signUpForceRedirectUrl="/learn"
                >
                  <Button size="lg" variant="ghost">
                    Login
                  </Button>
                </SignInButton>
              </SignedOut>

              <a
                onClick={() => Browser.open({ url: "http://github.com/" })}
                rel="noreferrer noopener"
                className={`${user ? "pt-1.5" : "mr-2 pt-3"} cursor-pointer`}
              >
                <IonImg
                  src="/github.svg"
                  alt="Source Code"
                  className="h-[20px] w-[20px]"
                />
              </a>
            </ClerkLoaded>
          </div>
        </div>
      </>
    </header>
  );
};
