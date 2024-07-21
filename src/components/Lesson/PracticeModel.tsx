import { IonContent, IonImg, IonModal } from "@ionic/react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { ModelProp } from "@/Types/Types";

function HeartsModel({ model }: ModelProp) {
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
                  src="/heart.svg"
                  alt="Mascot Sad"
                  className="h-[100px] w-[100px]"
                />
              </div>
              <h1 className="text-center mb-2 text-2xl font-bold">
                Practice lesson
              </h1>
              <p className="text-center mb-5 text-base">
                Use practice lessons to regain hearts and points. You cannot
                loose hearts or points in practice lessons.
              </p>

              <div className="flex w-full flex-col gap-y-4">
                <Button
                  variant="primary"
                  className="w-full"
                  size="lg"
                  onClick={() => model.current?.dismiss()}
                >
                  I understand
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
