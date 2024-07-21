import { useEffect, useState } from "react";
import { useIonToast } from "@ionic/react";
import { supabase } from "../../supabaseClient";
import { useUserContext } from "@/ContextApi/UserContext";
import usegetCourseProgress from "./usegetCourseProgress";
const usegetLesson = (id?: number) => {
  const { user } = useUserContext();
  const { ActiveLessonId } = usegetCourseProgress();
  const [Lesson, setLesson] = useState<any | null>(null);
  const [LessonPercentage, setLessonPercentage] = useState<number>(0);
  const [Loading, setLoading] = useState<boolean>(true);
  const [present] = useIonToast();
  const GetLessonPercentage = async (Lesson: any) => {
    const completedChallenges = Lesson.challenges.filter(
      (challenge: any) => challenge.completed
    );
    const percentage = Math.round(
      (completedChallenges.length / Lesson.challenges.length) * 100
    );
    setLessonPercentage(percentage);
  };
  const GetLesson = async () => {
    try {
      const LessonId = id || ActiveLessonId;
      if (!LessonId) return;
      const { data, error } = await supabase
        .from("lessons")
        .select(
          `
        *,
        challenges (
          *,
          challengeOptions (*),
          challengeProgress (*)
        )
      `
        )
        .eq("id", LessonId)
        .eq("challenges.challengeProgress.userId", user.id)
        .order("order", { ascending: true })
        .single();

      if (error) {
        throw new Error(error.message || "Error fetching lesson data");
      }

      if (!data || !data.challenges) {
        throw new Error("No data or challenges found");
      }

      // Ensure challenges are sorted by the "order" field
      const sortedChallenges = data.challenges.sort(
        (a: any, b: any) => a?.order - b?.order
      );

      // Map sorted challenges to include "completed" field
      const normalizedChallenges = sortedChallenges.map((challenge: any) => {
        const completed =
          challenge?.challengeProgress &&
          challenge?.challengeProgress.length > 0 &&
          challenge?.challengeProgress.every(
            (progress: any) => progress?.completed
          );
        return { ...challenge, completed };
      });

      // Update data with normalized challenges
      const updatedData = { ...data, challenges: normalizedChallenges };
      setLesson(updatedData);
      GetLessonPercentage(updatedData);
    } catch (e: any) {
      present({
        message: e.message || "Something went wrong",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetLesson();
  }, [ActiveLessonId]);
  return { Lesson, LessonPercentage, Loading, GetLesson };
};

export default usegetLesson;
