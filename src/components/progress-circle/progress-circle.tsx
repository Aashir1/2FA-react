import { FC } from "react";

interface ProgressCircleProps {
  percentage: number;
  radius?: number;
  color?: string;
  strokeWidth?: number;
  fontSize?: number;
  text?: string;
}

export const ProgressCircle: FC<ProgressCircleProps> = (props) => {
  const {
    percentage,
    color = "black",
    radius = 20,
    strokeWidth = 2,
    fontSize,
    text,
  } = props;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const cx = radius + 5;
  const cy = radius + 5;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="progress-ring" height={cy * 2} width={cx * 2}>
        <circle
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="progress-ring__circle"
          color="red"
          r={radius}
          cx={cx}
          cy={cy}
        />
      </svg>
      <span
        className="absolute ml-auto mr-auto inline-block"
        style={{ fontSize: fontSize ?? Math.max(radius - 4, 16) }}
      >
        {text ? text : `${percentage}%`}
      </span>
    </div>
  );
};
