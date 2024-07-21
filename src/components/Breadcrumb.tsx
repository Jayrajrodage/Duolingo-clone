import React from "react";
import { IonBreadcrumb, IonImg } from "@ionic/react";

interface BreadcrumbTypes {
  title: string;
  link: string;
  img?: string;
}

export const Breadcrumb: React.FC<BreadcrumbTypes> = ({ title, link, img }) => {
  return (
    <IonBreadcrumb href={link}>
      {img && <IonImg src={img} alt={img} className="mr-2 w-[20px] h-[20px]" />}
      {title}
    </IonBreadcrumb>
  );
};
