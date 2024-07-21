import { Button } from "@/components/ui/button";
import { IonImg } from "@ionic/react";
export const Footer = () => {
  return (
    <div className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <IonImg
            src="/hr.svg"
            alt="Croatian"
            className="mr-4 h-[32px] w-[40px] rounded-md"
          />
          Croatian
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <IonImg
            src="/es.svg"
            alt="Spanish"
            className="mr-4 h-[32px] w-[40px] rounded-md"
          />
          Spanish
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <IonImg
            src="/fr.svg"
            alt="French"
            className="mr-4 h-[32px] w-[40px] rounded-md"
          />
          French
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <IonImg
            src="/it.svg"
            alt="Italian"
            className="mr-4 h-[32px] w-[40px] rounded-md"
          />
          Italian
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <IonImg
            src="/jp.svg"
            alt="Japanese"
            className="mr-4 h-[32px] w-[40px] rounded-md"
          />
          Japanese
        </Button>
      </div>
    </div>
  );
};
