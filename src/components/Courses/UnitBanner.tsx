import { BookText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { UnitBannerProps } from "@/Types/Types";

export const UnitBanner = ({ title, description }: UnitBannerProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-green-500 p-5 text-white">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>

      <>
        <Button
          size="lg"
          variant="secondary"
          className="hidden border-2 border-b-4 active:border-b-2 xl:flex"
        >
          <BookText className="mr-2" />
          Continue
        </Button>
      </>
    </div>
  );
};
