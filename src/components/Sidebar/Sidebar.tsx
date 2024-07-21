import { IonMenu, IonContent, IonList, IonImg, IonItem } from "@ionic/react";
import { SidebarItems } from "./Sidebar-items";
import SidebarHeader from "./SidebarHeader";
import { SidebarBottem } from "./SidebarBottem";
import { useRef } from "react";

export const Sidebar = () => {
  const menuRef = useRef<HTMLIonMenuElement>(null);
  return (
    <IonMenu ref={menuRef} contentId="main-content">
      <SidebarHeader />
      <IonContent className="ion-padding">
        <IonList>
          <SidebarItems
            label="Courses"
            href="/courses"
            iconSrc="/learn.svg"
            Menu={menuRef}
          />
          <SidebarItems
            label="Leaderboard"
            href="/leaderboard"
            iconSrc="/leaderboard.svg"
            Menu={menuRef}
          />
          <SidebarItems
            label="Quests"
            href="/quests"
            iconSrc="/quests.svg"
            Menu={menuRef}
          />
          <SidebarItems
            label="Shop"
            href="/shop"
            iconSrc="/shop.svg"
            Menu={menuRef}
          />
        </IonList>
      </IonContent>
      <SidebarBottem />
    </IonMenu>
  );
};
