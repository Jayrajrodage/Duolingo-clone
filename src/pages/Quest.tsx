import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Progress } from "@/components/ui/progress";
import { QUESTS } from "@/constants";
import usePurchase from "@/hooks/User/usePurchase";
import useUserProgress from "@/hooks/User/useUserProgress";
import { IonContent, IonImg, IonPage } from "@ionic/react";
import React from "react";

const Quest: React.FC = () => {
  const { SubScription } = usePurchase();
  const { points } = useUserProgress();
  return (
    <>
      <Sidebar />
      <IonPage>
        <Header
          showMenuButton={true}
          hasActiveSubscription={SubScription?.isActive}
        />
        <IonContent className="ion-padding">
          <div className="flex w-full flex-col items-center">
            <IonImg
              src="/quests.svg"
              alt="Quests"
              className="h-[90px] w-[90px]"
            />

            <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
              Quests
            </h1>
            <p className="mb-6 text-center text-lg text-muted-foreground">
              Complete quests by earning points.
            </p>

            <ul className="w-full">
              {QUESTS.map((quest) => {
                if (!points) return;
                const progress = (points / quest.value) * 100;
                return (
                  <div
                    className="flex w-full items-center gap-x-4 border-t-2 p-4"
                    key={quest.title}
                  >
                    <IonImg
                      src="/points.svg"
                      alt="Points"
                      className="h-[60px] w-[60px]"
                    />

                    <div className="flex w-full flex-col gap-y-2">
                      <p className="text-xl font-bold text-neutral-700">
                        {quest.title}
                      </p>

                      <Progress value={progress} className="h-3" />
                    </div>
                  </div>
                );
              })}
            </ul>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Quest;
