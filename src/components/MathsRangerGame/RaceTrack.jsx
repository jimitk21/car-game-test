import "./RaceTrack.css";

const RaceTrack = ({ playerPosition, aiCarsPositions, playerSpeed }) => {
  const getCarStyle = (position, carIndex = 0) => {
    // Calculate position along the rectangular track
    const trackLength = 1800;
    const normalizedPos = (position % trackLength) / trackLength;

    // Track dimensions - bigger horizontal track
    const trackWidth = 680;
    const trackHeight = 380;
    const cornerRadius = 80;

    // Lane configuration - 4 separate lanes
    const laneWidth = 25;
    const laneSpacing = 35;

    // Calculate lane offset from the outer edge
    const baseLaneOffset = 50; // Distance from track edge
    const laneOffset = baseLaneOffset + carIndex * laneSpacing;

    let x,
      y,
      rotation = 0;

    if (normalizedPos <= 0.25) {
      // Top straight - moving LEFT (from right to left)
      const progress = normalizedPos / 0.25;
      x =
        trackWidth - cornerRadius - progress * (trackWidth - 2 * cornerRadius);
      y = laneOffset;
      rotation = 180; // Facing left
    } else if (normalizedPos <= 0.5) {
      // Left curve - turning DOWN
      const progress = (normalizedPos - 0.25) / 0.25;
      const angle = (progress * Math.PI) / 2;
      const radius = cornerRadius + laneOffset;
      x = cornerRadius - radius * Math.cos(angle);
      y = cornerRadius + radius * Math.sin(angle);
      rotation = 180 + progress * 90; // 180° to 270°
    } else if (normalizedPos <= 0.75) {
      // Bottom straight - moving RIGHT (from left to right)
      const progress = (normalizedPos - 0.5) / 0.25;
      x = cornerRadius + progress * (trackWidth - 2 * cornerRadius);
      y = trackHeight - laneOffset;
      rotation = 0; // Facing right
    } else {
      // Right curve - turning UP
      const progress = (normalizedPos - 0.75) / 0.25;
      const angle = (progress * Math.PI) / 2;
      const radius = cornerRadius + laneOffset;
      x = trackWidth - cornerRadius + radius * Math.cos(angle);
      y = trackHeight - cornerRadius - radius * Math.sin(angle);
      rotation = progress * 90; // 0° to 90°
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
            {/* Player Car - Outermost lane (lane 0) */}
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
            {/* AI Cars - Each in their own lane */}
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

      {/* Starting line indicator */}
      <div
        className="progress-indicators"
        style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}
      >
        <div
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            padding: "10px 20px",
            borderRadius: "15px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          🏁 Race to the Finish Line! 🏁
        </div>
      </div>
    </div>
  );
};

export default RaceTrack;
