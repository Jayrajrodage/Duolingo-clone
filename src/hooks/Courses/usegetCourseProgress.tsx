import { useEffect, useState } from "react";
import { useIonToast } from "@ionic/react";
import { supabase } from "../../supabaseClient";
import { CourseType, lesson } from "@/Types/Types";
import useUserProgress from "../User/useUserProgress";
import { useUserContext } from "@/ContextApi/UserContext";
const usegetCourseProgress = () => {
  const { ActiveCourseId } = useUserProgress();
  const { user } = useUserContext();
  const [Loading, setLoading] = useState<boolean>(true);
  const [ActiveLessonId, setActiveLessonId] = useState<number>();
  const [ActiveLesson, setActiveLesson] = useState<lesson[]>([]);
  const [present] = useIonToast();
  const GetData = async () => {
    if (!ActiveCourseId || !user) return;
    try {
      const { data, error } = await supabase
        .from("units")
        .select("*,lessons(*,challenges(*,challengeProgress(*)))")
        .eq("courseId", ActiveCourseId)
        .order("order", { ascending: true });
      if (error) {
        throw error;
      }
      const firstUncompletedLesson = data
        .flatMap((unit) => unit.lessons)
        .find((lesson) => {
          return lesson.challenges.some((challenge: any) => {
            return (
              !challenge.challengeProgress ||
              challenge.challengeProgress.length === 0 ||
              challenge.challengeProgress.some(
                (progress: any) => progress.completed === false
              )
            );
          });
        });
      setActiveLessonId(firstUncompletedLesson?.id);
      setActiveLesson(firstUncompletedLesson);
    } catch (e: any) {
      present({
        message: e.error_description || e.message,
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    GetData();
  }, [ActiveCourseId]);
  return { ActiveLessonId, ActiveLesson, Loading };
};

export default usegetCourseProgress;
