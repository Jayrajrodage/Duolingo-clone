import { useEffect, useState } from "react";
import { useIonToast } from "@ionic/react";
import { supabase } from "../../supabaseClient";
import { CourseType } from "@/Types/Types";
const usegetCourse = () => {
  const [Courses, setCourses] = useState<CourseType[]>([]);
  const [Loading, setLoading] = useState<boolean>(true);
  const [present] = useIonToast();
  const GetCourse = async () => {
    try {
      const { data, error } = await supabase.from("courses").select("*");
      if (error) {
        throw error;
      }
      setCourses(data);
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
    GetCourse();
  }, []);
  return { Courses, Loading, GetCourse };
};

export default usegetCourse;
