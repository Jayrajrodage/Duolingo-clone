import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonImg,
  IonItem,
  IonBackButton,
} from "@ionic/react";
import { Button } from "./ui/button";
import { InfinityIcon, Loader } from "lucide-react";
import useUserProgress from "@/hooks/User/useUserProgress";
import { HeaderTypes } from "@/Types/Types";
import { useEffect } from "react";
export const Header = ({
  title,
  showMenuButton,
  showBackButton,
  hasActiveSubscription,
  ReRender,
}: HeaderTypes) => {
  const { loading, points, hearts, GetCourses } = useUserProgress();
  useEffect(() => {
    GetCourses();
  }, [ReRender]);
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons>
          {showBackButton && <IonBackButton />}
          {showMenuButton && <IonMenuButton></IonMenuButton>}
        </IonButtons>

        <IonTitle>{title}</IonTitle>
        <IonItem lines="none" slot="end">
          {loading ? (
            <>
              <Loader className="h-5 w-5 animate-spin text-muted-foreground ml-5" />
            </>
          ) : (
            <div className="flex gap-2">
              <a className="flex" href="/shop">
                <Button variant="ghost" className="text-orange-500">
                  <IonImg
                    src="/points.svg"
                    alt="Points"
                    className="mr-2 w-[28px] h-[28px]"
                  />
                  {points}
                </Button>
              </a>

              <a href="/shop">
                <Button variant="ghost" className="text-rose-500">
                  <IonImg
                    src="/heart.svg"
                    alt="Hearts"
                    className="mr-2 w-[22px] h-[22px]"
                  />
                  {hasActiveSubscription ? (
                    <InfinityIcon className="stroke-3 h-4 w-4" />
                  ) : (
                    <>{hearts}</>
                  )}
                </Button>
              </a>
            </div>
          )}
        </IonItem>
      </IonToolbar>
    </IonHeader>
  );
};
