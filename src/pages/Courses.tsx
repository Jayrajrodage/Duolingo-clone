import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import {
  IonContent,
  IonLabel,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonViewWillEnter,
} from "@ionic/react";
import React from "react";
import usegetCourse from "@/hooks/Courses/usegetCourse";
import { List } from "@/components/Courses/List";
import useUserProgress from "@/hooks/User/useUserProgress";
import { Spinner } from "@/components/ui/Spinner";
import usePurchase from "@/hooks/User/usePurchase";
const Courses: React.FC = () => {
  const { Courses, Loading, GetCourse: refetchCourses } = usegetCourse();
  const { SubScription } = usePurchase();
  const {
    ActiveCourseId,
    loading,
    GetCourses: refetchUserProgress,
  } = useUserProgress();

  const handleRefresh = async (event: CustomEvent) => {
    await refetchCourses();
    await refetchUserProgress();
    event.detail.complete();
  };
  useIonViewWillEnter(() => {
    refetchCourses();
    refetchUserProgress();
  });
  return (
    <>
      <Sidebar />
      <IonPage id="main-content">
        <Header
          showMenuButton={true}
          hasActiveSubscription={SubScription?.isActive}
        />
        <IonContent className="ion-padding">
          <IonLabel>Courses</IonLabel>
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent />
          </IonRefresher>
          {Loading || loading ? (
            <Spinner />
          ) : (
            <>
              <List list={Courses} activeCourseId={ActiveCourseId} />
            </>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Courses;
