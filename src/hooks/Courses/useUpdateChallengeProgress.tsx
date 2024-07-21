import { useUserContext } from "@/ContextApi/UserContext";
import React, { useEffect, useState } from "react";
import useUserProgress from "../User/useUserProgress";
import { supabase } from "@/supabaseClient";
import { useIonToast } from "@ionic/react";
import usePurchase from "../User/usePurchase";

const useUpdateChallengeProgress = (ChallengeId: number) => {
  const { user } = useUserContext();
  const { SubScription } = usePurchase();
  const [Loading, setLoading] = useState<boolean>(false);
  const { hearts, points, GetCourses } = useUserProgress();
  const [present] = useIonToast();
  const GetExistingChallengeProgress = async () => {
    try {
      const { data, error } = await supabase
        .from("challengeProgress")
        .select("*")
        .eq("userId", user.id)
        .eq("challengeId", ChallengeId)
        .limit(1)
        .single();
      if (error) {
        throw error;
      }
      if (!data) {
        throw Error("Challenge not found");
      }
      return data;
    } catch (e: any) {
      console.log("🚀 ~ GetExsitingChallengProgress ~ error:", e);
    }
  };
  const InsertData = async () => {
    try {
      const { error } = await supabase
        .from("challengeProgress")
        .insert([
          { challengeId: ChallengeId, userId: user.id, completed: true },
        ])
        .select();
      if (error) {
        throw error;
      }
      const { error: Error } = await supabase
        .from("userProgress")
        .update({ points: points! + 10 })
        .eq("userId", user.id);

      if (Error) {
        throw Error;
      }
      await GetCourses();
    } catch (e: any) {
      console.log("🚀 ~ InsertData ~ error:", e);
      present({
        message: e.error_description || e.message,
        duration: 3000,
      });
    }
  };
  const UpdateData = async (id: number) => {
    try {
      const { error: updateError } = await supabase
        .from("challengeProgress")
        .update({ completed: true })
        .eq("id", id);

      if (updateError) {
        throw updateError;
      }
      const { error: Error } = await supabase
        .from("userProgress")
        .update({ hearts: Math.min(hearts! + 1, 5), points: points! + 10 })
        .eq("userId", user.id);

      if (Error) {
        throw Error;
      }
    } catch (e: any) {
      console.log("🚀 ~ UpdateData ~ error:", e);
      present({
        message: e.error_description || e.message,
        duration: 3000,
      });
    }
  };
  const upsertChallengeProgress = async () => {
    if (hearts === null || points === undefined) {
      present({
        message: "Hearts or points not found",
        duration: 3000,
      });
      return;
    }
    if (!user) {
      throw Error("user not found");
    }
    setLoading(true);
    try {
      const existingChallengeProgress = await GetExistingChallengeProgress();
      const isPractice = !!existingChallengeProgress;
      if (hearts === 0 && !isPractice) {
        return { error: "hearts" };
      }
      if (isPractice) {
        await UpdateData(existingChallengeProgress?.id);
      }
      await InsertData();
    } catch (e: any) {
      present({
        message: e.error_description || e.message,
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };
  const ReduceHearts = async () => {
    try {
      if (hearts === null || points === undefined) {
        present({
          message: "Hearts or points not found",
          duration: 3000,
        });
        return;
      }
      if (!user) {
        throw Error("user not found");
      }
      if (SubScription?.isActive) {
        return { error: "subscription" };
      }
      const existingChallengeProgress = await GetExistingChallengeProgress();
      const isPractice = !!existingChallengeProgress;
      if (isPractice) {
        return { error: "Practice" };
      }
      if (hearts === 0) {
        return { error: "hearts" };
      }
      const { error } = await supabase
        .from("userProgress")
        .update({ hearts: Math.max(hearts - 1, 0) })
        .eq("userId", user.id);

      if (error) {
        throw error;
      }
      await GetCourses();
    } catch (error: any) {
      console.log("🚀 ~ ReduceHearts ~ error:", error);
      present({
        message: error?.error_description || error?.message,
        duration: 3000,
      });
    }
  };
  useEffect(() => {}, [hearts, points, user]);
  return { Loading, upsertChallengeProgress, ReduceHearts };
};

export default useUpdateChallengeProgress;
