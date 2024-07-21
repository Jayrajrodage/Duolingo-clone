import { useState } from "react";
import { useIonToast } from "@ionic/react";
import { supabase } from "../../supabaseClient";
import { useUserContext } from "@/ContextApi/UserContext";
import useUserProgress from "./useUserProgress";

const useAddUserProgress = () => {
  const { user } = useUserContext();
  //const { Course, Loading: courseLoading } = usegetCourseById(CourseId);
  const { ActiveCourseId, loading: progressLoading } = useUserProgress();
  const [loading, setLoading] = useState<boolean>(false);
  const [present] = useIonToast();

  const addUserProgress = async (CourseId: number) => {
    if (!user || progressLoading) return;

    setLoading(true);

    try {
      if (ActiveCourseId) {
        const { error: updateError } = await supabase
          .from("userProgress")
          .update({
            userName: user.username || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",
            activeCourseId: CourseId,
          })
          .eq("userId", user.id);

        if (updateError) {
          throw updateError;
        }
      } else {
        const { error: insertError } = await supabase
          .from("userProgress")
          .insert({
            userId: user.id,
            userName: user.username || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",
            activeCourseId: CourseId,
          });

        if (insertError) {
          throw insertError;
        }
      }
    } catch (e: any) {
      present({
        message: e.error_description || e.message,
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return { addUserProgress, loading };
};

export default useAddUserProgress;
