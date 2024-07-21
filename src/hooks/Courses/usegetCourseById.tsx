import { useEffect, useState } from "react";
import { useIonToast } from "@ionic/react";
import { supabase } from "../../supabaseClient";
import { CourseType } from "@/Types/Types";

const usegetCourseById = (CourseId: number) => {
  const [Course, setCourse] = useState<CourseType>();
  const [Loading, setLoading] = useState<boolean>(true);
  const [present] = useIonToast();
  const GetCourses = async () => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("id", CourseId)
        .limit(1)
        .single();
      if (error) {
        throw error;
      }
      setCourse(data);
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
  }, []);
  return { Course, Loading, GetCourses };
};

export default usegetCourseById;
