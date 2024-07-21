import { IonImg, IonItem, IonLabel, useIonRouter } from "@ionic/react";

interface SidebarItemProps {
  label: string;
  iconSrc: string;
  href: string;
  Menu: React.RefObject<HTMLIonMenuElement>;
}
export const SidebarItems = ({
  label,
  iconSrc,
  href,
  Menu,
}: SidebarItemProps) => {
  const route = useIonRouter();
  const Redirect = () => {
    route.push(href);
    if (Menu?.current) {
      Menu?.current.close();
    }
  };

  return (
    <IonItem className=" cursor-pointer" onClick={Redirect}>
      <IonImg src={iconSrc} alt={label} className="mr-5 h-[32px] w-[32px]" />
      <IonLabel>{label}</IonLabel>
    </IonItem>
  );
};
