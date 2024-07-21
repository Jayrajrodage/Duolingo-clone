import { IonContent, IonImg, IonModal, useIonRouter } from "@ionic/react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { ModelProp } from "@/Types/Types";

function ExitModel({ model }: ModelProp) {
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
                  src="/mascot_sad.svg"
                  alt="Mascot Sad"
                  className="h-[80px] w-[80px]"
                />
              </div>
              <h1 className="text-center mb-2 text-2xl font-bold">
                Wait don't go!
              </h1>
              <p className="text-center mb-5 text-base">
                You&apos;re about to leave the lesson. Are you sure?
              </p>

              <div className="flex w-full flex-col gap-y-4">
                <Button
                  variant="primary"
                  className="w-full"
                  size="lg"
                  onClick={() => model.current?.dismiss()}
                >
                  Keep learning
                </Button>

                <Button
                  variant="dangerOutline"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    close();
                    router.push("/learn");
                  }}
                >
                  End session
                </Button>
              </div>
            </>
          </div>
        </IonContent>
      </IonModal>
    </>
  );
}
export default ExitModel;
