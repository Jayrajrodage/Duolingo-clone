import { InfinityIcon, X } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { IonImg } from "@ionic/react";
import ExitModel from "./ExitModel";
import { useRef } from "react";

type HeaderProps = {
  hearts: number;
  percentage: number | undefined;
  hasActiveSubscription: boolean;
};

export const LessonHeader = ({
  hearts,
  percentage,
  hasActiveSubscription,
}: HeaderProps) => {
  const exitmodel = useRef<HTMLIonModalElement>(null);
  return (
    <header className="mx-auto flex w-full max-w-[1140px] items-center justify-between gap-x-7 px-10 pt-[20px] lg:pt-[50px]">
      <X
        onClick={() => exitmodel.current?.present()}
        className="cursor-pointer text-slate-500 transition hover:opacity-75"
      />
      <Progress value={percentage} />
      <ExitModel model={exitmodel} />
      <div className="flex items-center font-bold text-rose-500">
        <IonImg
          src="/heart.svg"
          alt="Heart"
          className="mr-2 h-[28px] w-[28px]"
        />
        {hasActiveSubscription ? (
          <InfinityIcon className="h-6 w-6 shrink-0 stroke-[3]" />
        ) : (
          hearts
        )}
      </div>
    </header>
  );
};
