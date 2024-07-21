import React, { ReactNode, useEffect } from "react";
import { Spinner } from "@/components/ui/Spinner";
import useUserProgress from "@/hooks/User/useUserProgress";
import { useIonRouter } from "@ionic/react";

type ProtectedProps = {
  children: ReactNode;
};

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { ActiveCourseId, loading } = useUserProgress();
  const router = useIonRouter();

  useEffect(() => {
    if (!loading && !ActiveCourseId) {
      router.push("/courses", "root", "replace");
    }
  }, [loading, ActiveCourseId, router]);

  if (loading) {
    return <Spinner />;
  }

  if (!ActiveCourseId) {
    return null;
  }

  return <>{children}</>;
};

export default Protected;
