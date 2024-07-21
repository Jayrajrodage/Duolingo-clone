import { useEffect, useState } from "react";
import { useIonToast } from "@ionic/react";
import { supabase } from "../../supabaseClient";
import useUserProgress from "../User/useUserProgress";
import { useUserContext } from "@/ContextApi/UserContext";
const usegetUnites = () => {
  const { ActiveCourseId } = useUserProgress();
  const { user } = useUserContext();
  const [Units, setUnits] = useState<any[]>([]);
  const [Loading, setLoading] = useState<boolean>(true);
  const [present] = useIonToast();
  const GetUnites = async () => {
    if (!ActiveCourseId || !user?.id) return;
    try {
      const { data, error } = await supabase
        .from("units")
        .select("*, lessons(*,challenges(*,challengeProgress(*)))")
        .eq("courseId", ActiveCourseId)
        .eq("lessons.challenges.challengeProgress.userId", user.id);

      if (error) {
        throw error;
      }
      const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson: any) => {
          if (lesson.challenges.length === 0) {
            return { ...lesson, completed: false };
          }
          const allCompletedChallenges = lesson.challenges.every(
            (challenge: any) => {
              return (
                challenge.challengeProgress &&
                challenge.challengeProgress.length > 0 &&
                challenge.challengeProgress.every(
                  (progress: any) => progress.completed
                )
              );
            }
          );
          return { ...lesson, completed: allCompletedChallenges };
        });
        return { ...unit, lessons: lessonsWithCompletedStatus };
      });
      setUnits(normalizedData);
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
    GetUnites();
  }, [ActiveCourseId]);
  return { Units, Loading, GetUnites };
};

export default usegetUnites;
