import "./RaceTrack.css";

const RaceTrack = ({ playerPosition, aiCarsPositions, playerSpeed }) => {
  const getCarStyle = (position, carIndex = 0) => {
    // Calculate position along the rectangular track
    const trackLength = 1800;
    // Reverse the direction by inverting the normalized position
    const normalizedPos = 1 - (position % trackLength) / trackLength;

    // Track dimensions - increased for bigger track
    const trackWidth = 480; // Increased from 300
    const trackHeight = 280; // Increased from 150
    const cornerRadius = 60; // Increased from 40

    // Lane separation - creates multiple lanes for cars
    const laneWidth = 25; // Width of each lane
    const totalLanes = 4; // Total number of lanes
    const baseLaneOffset = -37.5; // Center offset for lanes
    const laneOffset = baseLaneOffset + carIndex * laneWidth;

    let x,
      y,
      rotation = 0;

    if (normalizedPos <= 0.25) {
      // Top straight
      const progress = normalizedPos / 0.25;
      x = progress * (trackWidth - 2 * cornerRadius) + cornerRadius;
      y = cornerRadius + laneOffset;
      rotation = 0;
    } else if (normalizedPos <= 0.5) {
      // Right curve
      const progress = (normalizedPos - 0.25) / 0.25;
      const angle = (progress * Math.PI) / 2;
      const radius = cornerRadius + laneOffset;
      x = trackWidth - cornerRadius + radius * Math.cos(angle);
      y = cornerRadius + radius * Math.sin(angle);
      rotation = progress * 90;
    } else if (normalizedPos <= 0.75) {
      // Bottom straight
      const progress = (normalizedPos - 0.5) / 0.25;
      x =
        trackWidth - cornerRadius - progress * (trackWidth - 2 * cornerRadius);
      y = trackHeight - cornerRadius - laneOffset;
      rotation = 180;
    } else {
      // Left curve
      const progress = (normalizedPos - 0.75) / 0.25;
      const angle = (progress * Math.PI) / 2;
      const radius = cornerRadius + laneOffset;
      x = cornerRadius - radius * Math.cos(angle);
      y = trackHeight - cornerRadius - radius * Math.sin(angle);
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
            {/* Player Car - Lane 0 */}
            <div
              className={`car player-car ${
                playerSpeed > 2
                  ? "nitro-boost"
                  : playerSpeed < 1
                  ? "slowed"
                  : ""
              }`}
              style={getCarStyle(playerPosition, 0)}
            >
              🏎️
            </div>
            {/* AI Cars - Different lanes */}
            {aiCarsPositions.map((position, index) => (
              <div
                key={index}
                className={`car ai-car ai-car-${index}`}
                style={getCarStyle(position, index + 1)}
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
