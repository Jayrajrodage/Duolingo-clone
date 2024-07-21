import { ListType } from "@/Types/Types";
import React, { useState, useTransition } from "react";
import { Card } from "./Card";
import { useIonRouter } from "@ionic/react";
import useUserProgress from "@/hooks/User/useUserProgress";
import useAddUserProgress from "@/hooks/User/useAddUserProgress";

export const List: React.FC<ListType> = ({ list, activeCourseId }) => {
  const router = useIonRouter();
  const [Id, setId] = useState<number>();
  const { Course } = useUserProgress();
  const [isPending, startTransition] = useTransition();
  const { addUserProgress } = useAddUserProgress();
  const onClick = (id: number) => {
    setId(id);
    startTransition(() => {
      if (id === Course?.activeCourseId) {
        router.push("/learn");
      } else {
        addUserProgress(id).then(() => {
          router.push("/learn");
        });
      }
    });
  };
  return (
    <div className="grid grid-cols-2 gap-4 pt-6 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {list.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={() => onClick(course.id)}
          disabled={isPending}
          isActive={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
