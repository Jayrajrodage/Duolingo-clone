import { POINTS_TO_REFILL } from "@/constants";
import useUserProgress from "./useUserProgress";
import { supabase } from "@/supabaseClient";
import { useUserContext } from "@/ContextApi/UserContext";
import { useEffect, useState } from "react";

const usePurchase = () => {
  const { user } = useUserContext();
  const { hearts, points, GetCourses } = useUserProgress();
  const [SubScription, SetSubScription] = useState<any>();
  const refillHearts = async () => {
    try {
      if (!hearts || !points) return;
      if (hearts === 5) {
        throw Error("Hearts are already full");
      }
      if (points < POINTS_TO_REFILL) {
        throw Error("Hearts are already full");
      }
      const { error: updateError } = await supabase
        .from("userProgress")
        .update({
          hearts: 5,
          points: points - POINTS_TO_REFILL,
        })
        .eq("userId", user.id);
      if (updateError) {
        throw updateError;
      }
      await GetCourses();
    } catch (error) {
      console.log("🚀 ~ refillHearts ~ error:", error);
    }
  };
  const GetUserSubscription = async () => {
    try {
      if (!user) return;
      const { error: updateError, data } = await supabase
        .from("userSubscription")
        .select("*")
        .eq("userId", user.id)
        .limit(1)
        .single();

      if (updateError) {
        throw updateError;
      }
      let isActive;
      if (!data) {
        isActive = false;
      } else {
        isActive = true;
      }
      SetSubScription({ ...data, isActive: isActive });
    } catch (error) {
      console.log("🚀 ~ GetUserSubscription ~ error:", error);
    }
  };
  useEffect(() => {
    GetUserSubscription();
  }, [user]);
  return { refillHearts, GetUserSubscription, SubScription };
};

export default usePurchase;
