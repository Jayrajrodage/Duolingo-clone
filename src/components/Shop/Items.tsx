import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { MAX_HEARTS, POINTS_TO_REFILL } from "../../constants";
import { ItemsProps } from "@/Types/Types";
import { IonImg, useIonToast } from "@ionic/react";
import usePurchase from "@/hooks/User/usePurchase";
import { Infinity } from "lucide-react";

export const Items = ({
  hearts,
  points,
  hasActiveSubscription,
  setHearts,
  setPoints,
  onUpgrade,
  Loading,
  OnPurchase,
}: ItemsProps) => {
  const [pending, startTransition] = useTransition();

  const [toast] = useIonToast();
  const { refillHearts } = usePurchase();
  const onRefillHearts = () => {
    if (pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL) return;
    startTransition(() => {
      refillHearts()
        .then(() => {
          setHearts(5), setPoints((prev) => prev && prev - POINTS_TO_REFILL);
        })
        .catch(() => toast("Something went wrong."));
    });
  };

  return (
    <ul className="w-full">
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4">
        <IonImg src="/heart.svg" alt="Heart" className="h-[60px] w-[60px]" />

        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Refill hearts
          </p>
        </div>

        <Button
          onClick={onRefillHearts}
          disabled={
            pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL
          }
          aria-disabled={
            pending || hearts === MAX_HEARTS || points < POINTS_TO_REFILL
          }
        >
          {hearts === MAX_HEARTS ? (
            "full"
          ) : (
            <div className="flex items-center">
              <IonImg
                src="/points.svg"
                alt="Points"
                className="h-[20px] w-[20px]"
              />

              <p>{POINTS_TO_REFILL}</p>
            </div>
          )}
        </Button>
      </div>

      <div className="flex w-full items-center gap-x-4 border-t-2 p-4 pt-8">
        <IonImg
          src="/unlimited.svg"
          alt="Unlimited"
          className="h-[60px] w-[60px]"
        />

        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Unlimited hearts
          </p>
        </div>

        <Button
          onClick={() => !hasActiveSubscription && onUpgrade()}
          disabled={pending}
          aria-disabled={pending}
        >
          {hasActiveSubscription ? <Infinity /> : "upgrade"}
        </Button>
      </div>

      {Loading && (
        <div className="text-center">
          <div id={"braintree-drop-in-div"} />
          <Button variant="primary" size="lg" onClick={OnPurchase}>
            Pay 20$
          </Button>
        </div>
      )}
    </ul>
  );
};
