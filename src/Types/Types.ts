export interface CourseType {
  id: number;
  created_at: string;
  title: string;
  imageSrc: string;
}

export interface ListType {
  list: CourseType[];
  activeCourseId: number | undefined;
}
export interface CourseCard {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  isActive?: boolean;
}

export interface HeaderTypes {
  title?: string;
  showMenuButton?: boolean;
  showBackButton?: boolean;
  hasActiveSubscription?: boolean;
  ReRender?: any;
}
export type LessonButtonProps = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  percentage: number;
};

type unit = {
  id: number;
  title: string;
  description: string;
  courseId: number;
  order: number;
};
export type lesson = {
  id: number;
  title: string;
  unitId: number;
  order: number;
  unit?: unit;
};

export type UnitProps = {
  id: number;
  order: number;
  title: string;
  description: string;
  lessons: (lesson & {
    completed: boolean;
  })[];
  activeLesson: (lesson & { unit: unit }) | undefined;
  activeLessonPercentage: number;
};

export type UnitBannerProps = {
  title: string;
  description: string;
};

export type ResultCardProps = {
  value: any;
  variant: "points" | "hearts";
};

export type ModelProp = {
  model: React.RefObject<HTMLIonModalElement>;
};

export type ItemsProps = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
  setPoints: React.Dispatch<React.SetStateAction<number | null>>;
  setHearts: React.Dispatch<React.SetStateAction<number | null>>;
  onUpgrade: () => void;
  Loading: boolean | undefined;
  OnPurchase: () => void;
};
