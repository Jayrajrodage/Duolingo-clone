import { IonImg } from "@ionic/react";

type QuestionBubbleProps = {
  question: string;
};

export const QuestionBubble = ({ question }: QuestionBubbleProps) => {
  return (
    <div className="mb-6 flex items-center gap-x-4">
      <IonImg
        src="/mascot.svg"
        alt="Mascot"
        className="hidden lg:block h-[60px] w-[60px]"
      />
      <IonImg
        src="/mascot.svg"
        alt="Mascot"
        className="block lg:hidden h-[40px] w-[40px]"
      />

      <div className="relative rounded-xl text-gray-500 border-2 px-4 py-2 text-sm lg:text-base">
        {question}

        <div
          className="absolute -left-3 top-1/2 h-0 w-0 -translate-y-1/2 rotate-90 transform border-x-8 border-t-8 border-x-transparent"
          aria-hidden
        />
      </div>
    </div>
  );
};
