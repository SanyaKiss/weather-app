import { FC } from "react";

interface InfoCardProps {
  title: string;
  value: string;
  icon: string;
}

export const InfoCard: FC<InfoCardProps> = ({ title, value, icon }) => {
  return (
    <div className="info">
      <div className="info__text-block">
        <p className="info__title">{title}</p>
        <div className="info__value">{value}</div>
      </div>
      <img src={icon} alt={title} className="info__icon" />
    </div>
  );
};
