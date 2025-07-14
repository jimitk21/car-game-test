"use client";

import { useState, useEffect, useRef } from "react";
import "./RaceTrack.css";

const RaceTrack = ({
  playerPosition,
  aiVehicles,
  playerSpeed,
  nitroActive,
}) => {
  const [trackWidth, setTrackWidth] = useState(800);
  const [vehicles, setVehicles] = useState([]);
  const [raceCompleted, setRaceCompleted] = useState(false);
  const speedChangeRef = useRef();
  const trackRef = useRef();

  // Track dimensions and lap configuration
  const TOTAL_LAPS = 2;
  const TRACK_PADDING = 80; // Space from edges
  const RACE_DISTANCE = trackWidth - TRACK_PADDING;

  // Initialize vehicles with player and AI
  useEffect(() => {
    // Generate random starting positions for AI vehicles
    const aiStartPositions = [
      RACE_DISTANCE - Math.random() * 60,
      RACE_DISTANCE - 60 - Math.random() * 60,
      RACE_DISTANCE - 120 - Math.random() * 60,
    ];
    // Shuffle the positions so any AI can be ahead
    for (let i = aiStartPositions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [aiStartPositions[i], aiStartPositions[j]] = [
        aiStartPositions[j],
        aiStartPositions[i],
      ];
    }
    const initialVehicles = [
      {
        id: "player",
        type: "player",
        position: RACE_DISTANCE, // Start from right side
        speed: playerSpeed + 0.2, // Slightly increased base speed
        currentLap: 1,
        direction: "left", // Start going left
        totalDistance: 0,
        emoji: "🏎️",
      },
      {
        id: "ai-car",
        type: "ai-car",
        position: aiStartPositions[0],
        speed: 1.8 + Math.random() * 0.5,
        currentLap: 1,
        direction: "left",
        totalDistance: 0,
        emoji: "🚗",
      },
      {
        id: "ai-bus",
        type: "ai-bus",
        position: aiStartPositions[1],
        speed: 1.5 + Math.random() * 0.4,
        currentLap: 1,
        direction: "left",
        totalDistance: 0,
        emoji: "🚌",
      },
      {
        id: "ai-truck",
        type: "ai-truck",
        position: aiStartPositions[2],
        speed: 1.6 + Math.random() * 0.3,
        currentLap: 1,
        direction: "left",
        totalDistance: 0,
        emoji: "🚚",
      },
    ];
    setVehicles(initialVehicles);
  }, [RACE_DISTANCE]);

  // Update track width on resize
  useEffect(() => {
    const updateTrackWidth = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.offsetWidth);
      }
    };

    updateTrackWidth();
    window.addEventListener("resize", updateTrackWidth);
    return () => window.removeEventListener("resize", updateTrackWidth);
  }, []);

  // AI speed variation every 2 seconds
  useEffect(() => {
    speedChangeRef.current = setInterval(() => {
      setVehicles((prev) =>
        prev.map((vehicle) => {
          if (vehicle.type === "player") {
            // Set the user car speed to match the prop exactly
            return { ...vehicle, speed: playerSpeed };
          }

          // Small speed variations for AI
          let baseSpeed;
          switch (vehicle.type) {
            case "ai-car":
              baseSpeed = 1.8;
              break;
            case "ai-bus":
              baseSpeed = 1.5;
              break;
            case "ai-truck":
              baseSpeed = 1.6;
              break;
            default:
              baseSpeed = 1.5;
          }

          const speedVariation = (Math.random() - 0.5) * 0.4; // ±0.2 variation
          const newSpeed = Math.max(0.8, baseSpeed + speedVariation);

          return { ...vehicle, speed: newSpeed };
        })
      );
    }, 2000);

    return () => {
      if (speedChangeRef.current) {
        clearInterval(speedChangeRef.current);
      }
    };
  }, [playerSpeed]);

  // Immediately update player speed when playerSpeed prop changes
  useEffect(() => {
    setVehicles((prev) =>
      prev.map((vehicle) =>
        vehicle.type === "player" ? { ...vehicle, speed: playerSpeed } : vehicle
      )
    );
  }, [playerSpeed]);

  // Update vehicle positions
  useEffect(() => {
    const updatePositions = () => {
      setVehicles((prev) =>
        prev.map((vehicle) => {
          const newVehicle = { ...vehicle };

          // Update position based on direction and speed
          if (vehicle.direction === "left") {
            newVehicle.position -= vehicle.speed;
            newVehicle.totalDistance += vehicle.speed;

            // Check if reached the start (left side)
            if (newVehicle.position <= 0) {
              newVehicle.position = 0;
              newVehicle.direction = "right";
            }
          } else {
            newVehicle.position += vehicle.speed;
            newVehicle.totalDistance += vehicle.speed;

            // Check if reached the end (right side)
            if (newVehicle.position >= RACE_DISTANCE) {
              newVehicle.position = RACE_DISTANCE;
              newVehicle.direction = "left";
              newVehicle.currentLap += 1;
            }
          }

          return newVehicle;
        })
      );
    };

    const interval = setInterval(updatePositions, 50);
    return () => clearInterval(interval);
  }, [RACE_DISTANCE]);

  // Check for race completion
  useEffect(() => {
    const winner = vehicles.find((v) => v.currentLap > TOTAL_LAPS);
    if (winner && !raceCompleted) {
      setRaceCompleted(true);
    }
  }, [vehicles, raceCompleted]);

  const getVehicleStyle = (vehicle) => {
    const leftPosition = 40 + vehicle.position;

    const direction = vehicle.direction === "right" ? -1 : 1;

    // Player car always faces right
    let transform = "scaleX(1)";
    // if (vehicle.id !== "player") {
    //   if (vehicle.direction === "right") {
    //     transform = "scaleX(-1)";
    //   } else {
    //     transform = "scaleX(1)";
    //   }
    // }
    if (vehicle.direction === "right") {
      transform = "scaleX(-1)";
    } else {
      transform = "scaleX(1)";
    }

    return {
      left: `${leftPosition}px`,
      transform: `scaleX(${direction})`, // fallback
      "--direction": direction,
      "--boostScale": 1.1, // optional, in case you want to tweak scale effect dynamically
    };
  };

  const getVehicleClasses = (vehicle) => {
    let classes = `vehicle ${vehicle.type}`;

    if (vehicle.id === "player") {
      if (vehicle.speed > 2) {
        classes += " nitro-boost";
      } else if (vehicle.speed < 1) {
        classes += " slow-down";
      }
    }

    return classes;
  };

  const getProgressPercentage = (vehicle) => {
    // Progress is 0% at the initial rightmost position (lap 1, direction left)
    // 50% at leftmost (lap 1, direction right)
    // 100% at rightmost after last lap
    const lapsCompleted = vehicle.currentLap - 1;
    let segmentProgress = 0;
    if (vehicle.direction === "left") {
      // Moving left: from right (RACE_DISTANCE) to left (0)
      segmentProgress = (RACE_DISTANCE - vehicle.position) / RACE_DISTANCE;
    } else {
      // Moving right: from left (0) to right (RACE_DISTANCE)
      segmentProgress = vehicle.position / RACE_DISTANCE;
    }
    // Each lap is two segments (left and right)
    const totalSegments = TOTAL_LAPS * 2;
    const completedSegments =
      lapsCompleted * 2 + (vehicle.direction === "left" ? 0 : 1);
    const progress = (completedSegments + segmentProgress) / totalSegments;
    return Math.min(100, Math.max(0, progress * 100));
  };

  return (
    <div className="race-track" ref={trackRef}>
      {/* Nitro Activated Floating Card */}
      {nitroActive && (
        <div className="nitro-card-float">
          <span className="nitro-title">Activate Nitro 🚀</span>
        </div>
      )}
      {/* Start and Finish Lines */}
      <div className="start-line"></div>
      <div className="finish-line"></div>

      {/* Lap Counter */}
      {/* <div className="lap-counter">
        Player: Lap{" "}
        {Math.min(
          vehicles.find((v) => v.id === "player")?.currentLap || 1,
          TOTAL_LAPS
        )}
        /{TOTAL_LAPS}
      </div> */}

      {/* Direction Indicators */}
      <div className="direction-indicator left">←</div>
      <div className="direction-indicator right">→</div>

      {/* Race Lanes */}
      {vehicles.map((vehicle, index) => (
        <div key={vehicle.id} className="race-lane">
          <div className="lane-label">
            {vehicle.id === "player" ? "YOU" : vehicle.type.toUpperCase()}
          </div>

          <div
            className={getVehicleClasses(vehicle)}
            style={{
              ...getVehicleStyle(vehicle),
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
              position: "absolute",
              width: "60px",
              height: "30px",
            }}
          >
            {/* Removed 💨 emoji for nitro boost */}
          </div>

          {/* Individual Progress Bar */}
          <div className="race-progress">
            <div
              className="progress-fill"
              style={{ width: `${getProgressPercentage(vehicle)}%` }}
            ></div>
          </div>
        </div>
      ))}

      {/* Race Status */}
      {raceCompleted && <div className="race-status">Race Complete!</div>}
    </div>
  );
};

export default RaceTrack;
