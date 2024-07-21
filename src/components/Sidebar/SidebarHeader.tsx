import { IonImg } from "@ionic/react";
export default function SidebarHeader() {
  return (
    <div className="flex justify-center py-5">
      <div className="flex items-center gap-x-1">
        <IonImg src="/mascot.svg" alt="Mascot" className="h-[40px] w-[40px] " />
        <h1 className="text-2xl ml-2 font-extrabold tracking-wide text-green-600">
          Lingo
        </h1>
      </div>
    </div>
  );
}
