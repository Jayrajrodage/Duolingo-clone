import { useEffect, useState } from "react";
import { useIonToast } from "@ionic/react";
import { supabase } from "../../supabaseClient";
import { useUser } from "@clerk/clerk-react";
const useUserProgress = () => {
  const [Course, setCourse] = useState<any>();
  const [ActiveCourseId, setActiveCourseId] = useState<number>();
  const [points, setPoints] = useState<number | null>(null);
  const [hearts, setHearts] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { user, isLoaded } = useUser();
  const [present] = useIonToast();
  const GetCourses = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from("userProgress")
        .select("activeCourseId,points,hearts ,courses(title, imageSrc)")
        .eq("userId", user?.id)
        .limit(1)
        .single();
      if (error) {
        throw error;
      }
      setCourse(data.courses);
      setActiveCourseId(data.activeCourseId);
      setPoints(data.points);
      setHearts(data.hearts);
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
    GetCourses();
  }, [isLoaded]);
  return { Course, ActiveCourseId, loading, points, hearts, GetCourses };
};

export default useUserProgress;
