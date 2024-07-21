import { Quiz } from "@/components/Lesson/Quiz";
import { Spinner } from "@/components/ui/Spinner";
import usegetLesson from "@/hooks/Courses/usegetLesson";
import useUserProgress from "@/hooks/User/useUserProgress";
import { useIonRouter } from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LessonId: React.FC = () => {
  const { id }: any = useParams();
  const { Lesson, Loading } = usegetLesson(id);
  const { hearts, loading } = useUserProgress();
  const [InitialPercentage, setInitialPercentage] = useState<number>();
  const history = useIonRouter();

  useEffect(() => {
    if (Lesson === null) return;
    if (!id) return;
    if (!Lesson) {
      history.push("/learn", "back", "pop"); // Redirect to the learn page
    } else {
      const initialPercentage =
        (Lesson?.challenges.filter((challenge: any) => challenge?.completed)
          .length /
          Lesson.challenges.length) *
        100;
      setInitialPercentage(initialPercentage);
    }
  }, [Lesson, hearts, Loading, loading, history, InitialPercentage, id]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full w-full flex-col">
        {loading || Loading ? (
          <Spinner />
        ) : (
          Lesson &&
          hearts !== undefined &&
          InitialPercentage !== undefined && (
            <Quiz
              initialLessonId={Lesson.id}
              initialLessonChallenges={Lesson.challenges}
              initialHearts={hearts}
              initialPercentage={InitialPercentage}
            />
          )
        )}
      </div>
    </div>
  );
};

export default LessonId;
