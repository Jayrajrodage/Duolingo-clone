import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import useGetTopTenUsers from "@/hooks/User/useGetTopUsers";
import usePurchase from "@/hooks/User/usePurchase";
import { IonContent, IonImg, IonPage } from "@ionic/react";
import React from "react";

const LeaderBoard: React.FC = () => {
  const { Users: leaderboard } = useGetTopTenUsers();
  const { SubScription } = usePurchase();
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
              src="/leaderboard.svg"
              alt="Leaderboard"
              className="h-[90px] w-[90px]"
            />

            <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
              Leaderboard
            </h1>
            <p className="mb-6 text-center text-lg text-muted-foreground">
              See where you stand among other learners in the community.
            </p>

            <Separator className="mb-4 h-0.5 rounded-full" />
            {leaderboard.map((userProgress, i) => (
              <div
                key={userProgress.userId}
                className="flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50"
              >
                <p className="mr-4 font-bold text-lime-700">{i + 1}</p>

                <Avatar className="ml-3 mr-6 h-12 w-12 border bg-green-500">
                  <AvatarImage
                    src={userProgress.userImageSrc}
                    className="object-cover"
                  />
                </Avatar>

                <p className="flex-1 font-bold text-neutral-800">
                  {userProgress.userName}
                </p>
                <p className="text-muted-foreground">
                  {userProgress.points} XP
                </p>
              </div>
            ))}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default LeaderBoard;
