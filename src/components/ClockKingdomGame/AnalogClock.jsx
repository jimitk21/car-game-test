import React from "react";

const AnalogClock = ({
  hours,
  minutes,
  interactive = false,
  size = 180,
  hourHandClass = "hour-hand-guess-time",
}) => {
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6;
  const numberRadius = size * 0.33; // 60 for 180px
  const hourHandLength = size * 0.22; // 40 for 180px
  const minuteHandLength = size * 0.33; // 60 for 180px
  const hourHandTop = size * 0.33; // 60 for 180px
  const minuteHandTop = size * 0.17; // 30 for 180px

  return (
    <div className="analog-clock" style={{ width: size, height: size }}>
      <div className="clock-face">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="hour-mark"
            style={{ transform: `rotate(${i * 30}deg)` }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`number-${i}`}
            className="hour-number"
            style={{
              transform: `rotate(${
                i * 30
              }deg) translateY(-${numberRadius}px) rotate(-${i * 30}deg)`,
            }}
          >
            {i === 0 ? 12 : i}
          </div>
        ))}
        <div
          className={`clock-hand ${hourHandClass}`}
          style={{
            transform: `translateX(-50%) rotate(${hourAngle}deg)`,
            height: `${hourHandLength}px`,
            top: `${hourHandTop}px`,
          }}
        />
        <div
          className="clock-hand minute-hand"
          style={{
            transform: `translateX(-50%) rotate(${minuteAngle}deg)`,
            height: `${minuteHandLength}px`,
            top: `${minuteHandTop}px`,
          }}
        />
        <div className="clock-center" />
      </div>
    </div>
  );
};

export default AnalogClock;
