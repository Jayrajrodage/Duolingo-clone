import { useUserContext } from "@/ContextApi/UserContext";
import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";

const useGetTopTenUsers = () => {
  const { user } = useUserContext();
  const [Users, SetUsers] = useState<any[]>([]);
  const GetTopTenUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("userProgress")
        .select("userId, userName, userImageSrc, points")
        .order("points", { ascending: false })
        .limit(10);

      if (error) {
        throw error;
      }
      SetUsers(data);
    } catch (error) {
      console.log("🚀 ~ GetTopTenUsers ~ error:", error);
    }
  };
  useEffect(() => {
    if (!user) return;
    GetTopTenUsers();
  }, [user]);
  return { GetTopTenUsers, Users };
};

export default useGetTopTenUsers;
