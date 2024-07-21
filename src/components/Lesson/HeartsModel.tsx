import { IonContent, IonImg, IonModal, useIonRouter } from "@ionic/react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { ModelProp } from "@/Types/Types";

function HeartsModel({ model }: ModelProp) {
  const router = useIonRouter();
  return (
    <>
      <IonModal ref={model}>
        <IonContent className="ion-padding">
          <div
            onClick={() => model.current?.dismiss()}
            className="flex cursor-pointer justify-end"
          >
            <X />
          </div>
          <div className="flex h-full flex-col items-center justify-center">
            <>
              <div className="mb-5 flex w-full items-center justify-center">
                <IonImg
                  src="/mascot_bad.svg"
                  alt="Mascot Sad"
                  className="h-[80px] w-[80px]"
                />
              </div>
              <h1 className="text-center mb-2 text-2xl font-bold">
                You ran out of hearts!
              </h1>
              <p className="text-center mb-5 text-base">
                Get pro for unlimited hearts, or purchase them in store.
              </p>

              <div className="flex w-full flex-col gap-y-4">
                <Button
                  variant="primary"
                  className="w-full"
                  size="lg"
                  onClick={() => router.push("/store")}
                >
                  Get unlimited hearts
                </Button>

                <Button
                  variant="primaryOutline"
                  className="w-full"
                  size="lg"
                  onClick={() => model.current?.dismiss()}
                >
                  No thanks
                </Button>
              </div>
            </>
          </div>
        </IonContent>
      </IonModal>
    </>
  );
}
export default HeartsModel;
