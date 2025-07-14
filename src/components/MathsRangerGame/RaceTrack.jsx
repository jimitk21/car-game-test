import "./RaceTrack.css";

const RaceTrack = ({ playerPosition, aiCarsPositions, playerSpeed }) => {
  const getCarStyle = (position) => {
    // Calculate position along the rectangular track
    const trackLength = 100;
    // Reverse the direction by inverting the normalized position
    const normalizedPos = 1 - (position % trackLength) / trackLength;

    // Track dimensions
    const trackWidth = 300;
    const trackHeight = 150;
    const cornerRadius = 40;

    let x,
      y,
      rotation = 0;

    if (normalizedPos <= 0.25) {
      // Top straight
      const progress = normalizedPos / 0.25;
      x = progress * (trackWidth - 2 * cornerRadius) + cornerRadius;
      y = cornerRadius;
      rotation = 0;
    } else if (normalizedPos <= 0.5) {
      // Right curve
      const progress = (normalizedPos - 0.25) / 0.25;
      const angle = (progress * Math.PI) / 2;
      x = trackWidth - cornerRadius + cornerRadius * Math.cos(angle);
      y = cornerRadius + cornerRadius * Math.sin(angle);
      rotation = progress * 90;
    } else if (normalizedPos <= 0.75) {
      // Bottom straight
      const progress = (normalizedPos - 0.5) / 0.25;
      x =
        trackWidth - cornerRadius - progress * (trackWidth - 2 * cornerRadius);
      y = trackHeight - cornerRadius;
      rotation = 180;
    } else {
      // Left curve
      const progress = (normalizedPos - 0.75) / 0.25;
      const angle = (progress * Math.PI) / 2;
      x = cornerRadius - cornerRadius * Math.cos(angle);
      y = trackHeight - cornerRadius - cornerRadius * Math.sin(angle);
      rotation = 180 + progress * 90;
    }

    return {
      left: `${x}px`,
      top: `${y}px`,
      transform: `rotate(${rotation}deg) ${
        playerSpeed > 2 ? "scale(1.1)" : ""
      }`,
    };
  };

  return (
    <div className="race-track-container">
      <div className="race-track">
        <div className="track-border">
          <div className="track-inner">
            <div className="finish-line">🏁</div>

            {/* Player Car */}
            <div
              className={`car player-car ${
                playerSpeed > 2
                  ? "nitro-boost"
                  : playerSpeed < 1
                  ? "slowed"
                  : ""
              }`}
              style={getCarStyle(playerPosition)}
            >
              🏎️
            </div>

            {/* AI Cars */}
            {aiCarsPositions.map((position, index) => (
              <div
                key={index}
                className={`car ai-car ai-car-${index}`}
                style={getCarStyle(position)}
              >
                🚗
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceTrack;
