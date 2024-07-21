import { Header } from "@/components/Header";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import {
  IonBadge,
  IonBreadcrumbs,
  IonContent,
  IonLabel,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import React from "react";
import useUserProgress from "@/hooks/User/useUserProgress";
import { Spinner } from "@/components/ui/Spinner";
import usegetUnites from "@/hooks/Courses/usegetUnites";
import { Unit } from "@/components/Courses/Units";
import { ArrowLeftCircleIcon } from "lucide-react";
import usegetLesson from "@/hooks/Courses/usegetLesson";
import usePurchase from "@/hooks/User/usePurchase";

const Learn: React.FC = () => {
  const { Course, loading } = useUserProgress();
  const { Units, Loading } = usegetUnites();
  const { SubScription } = usePurchase();
  const { Lesson, LessonPercentage, Loading: load } = usegetLesson();
  const router = useIonRouter();
  return (
    <>
      <Sidebar />
      <IonPage id="main-content">
        <Header showMenuButton={true} hasActiveSubscription={SubScription} />
        <IonContent className="ion-padding">
          {loading || Loading || load ? (
            <>
              <Spinner />
            </>
          ) : (
            <>
              <div className="flex gap-2">
                <ArrowLeftCircleIcon
                  size="30"
                  onClick={() => router.push("/courses", "back", "pop")}
                  className=" cursor-pointer "
                />
                <IonLabel className="mt-1">{Course?.title}</IonLabel>
              </div>

              <div className="py-2">
                {Units.map((unit) => (
                  <div key={unit.id} className="mb-10">
                    <Unit
                      id={unit.id}
                      order={unit.order}
                      description={unit.description}
                      title={unit.title}
                      lessons={unit.lessons}
                      activeLesson={Lesson}
                      activeLessonPercentage={LessonPercentage}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Learn;
