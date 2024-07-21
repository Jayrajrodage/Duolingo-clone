import { useRef, useState } from "react";
import { LessonHeader } from "./LessonHeader";
import { QuestionBubble } from "./QuestionBubble";
import { Challenge } from "./Challenge";
import { Footer } from "./Footer";
import useUpdateChallengeProgress from "@/hooks/Courses/useUpdateChallengeProgress";
import { IonImg, useIonRouter, useIonToast } from "@ionic/react";
import { useAudio, useWindowSize, useMount } from "react-use";
import ReactConfetti from "react-confetti";
import { ResultCard } from "./Result-card";
import HeartsModel from "./HeartsModel";
import PracticeModel from "./PracticeModel";
import usePurchase from "@/hooks/User/usePurchase";
type QuizProps = {
  initialPercentage: number | undefined;
  initialHearts: number | null;
  initialLessonId: number;
  initialLessonChallenges: any[];
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialLessonId,
  initialLessonChallenges,
}: QuizProps) => {
  const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
  const [incorrectAudio, _i, incorrectControls] = useAudio({
    src: "/incorrect.wav",
  });
  const [finishAudio] = useAudio({
    src: "/finish.mp3",
    autoPlay: true,
  });
  const { SubScription } = usePurchase();
  const heartsModel = useRef<HTMLIonModalElement>(null);
  const practiceModel = useRef<HTMLIonModalElement>(null);
  useMount(() => {
    if (initialPercentage === 100) {
      practiceModel.current?.present();
    }
  });
  const router = useIonRouter();
  const { width, height } = useWindowSize();
  const [hearts, setHearts] = useState(initialHearts);
  const [percentage, setPercentage] = useState(() =>
    initialPercentage === 100 ? 0 : initialPercentage
  );
  const [challenges] = useState(initialLessonChallenges);
  const [LessonId] = useState(initialLessonId);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges?.findIndex(
      (challenge: any) => !challenge.completed
    );
    return uncompletedIndex !== -1 ? uncompletedIndex : 0;
  });
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"none" | "wrong" | "correct">("none");
  const [present] = useIonToast();
  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];
  const { upsertChallengeProgress, Loading, ReduceHearts } =
    useUpdateChallengeProgress(challenge?.id);
  const title =
    challenge?.type === "ASSIST"
      ? "Select the correct meaning"
      : challenge?.question;

  const onSelect = (id: number) => {
    if (status !== "none") return;

    setSelectedOption(id);
  };

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  if (!challenge) {
    return (
      <>
        {finishAudio}
        <ReactConfetti
          recycle={false}
          numberOfPieces={500}
          tweenDuration={10_000}
          width={width}
          height={height}
        />
        <div className="mx-auto flex h-full max-w-lg flex-col items-center justify-center gap-y-4 text-center lg:gap-y-8">
          <IonImg
            src="/finish.svg"
            alt="Finish"
            className="hidden lg:block h-[100px] w-[100px]"
          />
          <IonImg
            src="/finish.svg"
            alt="Finish"
            className="block lg:hidden h-[100px] w-[100px]"
          />

          <h1 className="text-lg font-bold text-neutral-700 lg:text-3xl">
            Great job! <br /> You&apos;ve completed the lesson.
          </h1>

          <div className="flex w-full items-center gap-x-4">
            <ResultCard variant="points" value={challenges.length * 10} />
            <ResultCard
              variant="hearts"
              value={SubScription?.isActive ? Infinity : hearts}
            />
          </div>
        </div>

        <Footer
          lessonId={LessonId}
          status="completed"
          onCheck={() => router.push("/learn", "root", "replace")}
        />
      </>
    );
  }
  const onContinue = async () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }
    const correctOption = options.find((option: any) => option.correct);
    if (!correctOption) return;
    if (correctOption?.id === selectedOption) {
      try {
        const data = await upsertChallengeProgress();
        if (data?.error === "hearts") {
          console.log("🚀 ~ onContinue ~ error:", data.error);
          heartsModel.current?.present();
          return;
        }
        void correctControls.play();
        setStatus("correct");
        if (!initialPercentage) {
          present({
            message: "Initial Percentage not found",
            duration: 3000,
          });
          return;
        }
        setPercentage((prev) => prev! + 100 / challenges.length);
        if (initialPercentage === 100) {
          setHearts((prev) => Math.min(prev! + 1, 5));
        }
      } catch (error) {
        console.log("🚀 ~ onContinue ~ correct options:", error);
        present({
          message: "Something went wrong in correct options",
          duration: 3000,
        });
      }
    } else {
      try {
        const data = await ReduceHearts();
        if (data?.error === "hearts") {
          heartsModel.current?.present();
          return;
        }
        void incorrectControls.play();
        setStatus("wrong");

        if (!data?.error) {
          setHearts((prev) => Math.max(prev! - 1, 0));
          present({
            message: "Incorrect Option, costed one heart",
            duration: 3000,
          });
        }
      } catch (error) {
        console.log("🚀 ~ onContinue ~ Incorrect options:", error);
        present({
          message: "Something went wrong in Incorrect options",
          duration: 3000,
        });
      }
    }
  };
  return (
    <>
      {incorrectAudio}
      {correctAudio}
      <HeartsModel model={heartsModel} />
      <PracticeModel model={practiceModel} />
      <LessonHeader
        hearts={hearts!}
        percentage={percentage}
        hasActiveSubscription={SubScription?.isActive}
      />

      <div className="flex-1">
        <div className="flex h-full items-center justify-center">
          <div className="flex w-full flex-col gap-y-12 px-6 lg:min-h-[350px] lg:w-[600px] lg:px-0">
            <h1 className="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
              {title}
            </h1>

            <div>
              {challenge?.type === "ASSIST" && (
                <QuestionBubble question={challenge.question} />
              )}

              <Challenge
                options={options}
                onSelect={onSelect}
                status={status}
                selectedOption={selectedOption}
                disabled={false}
                type={challenge?.type}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        disabled={!selectedOption || Loading}
        status={status}
        onCheck={onContinue}
      />
    </>
  );
};
