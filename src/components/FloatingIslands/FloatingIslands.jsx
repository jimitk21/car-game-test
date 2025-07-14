import "./FloatingIslands.css";

const FloatingIslands = ({ scrollY }) => {
  const islands = [
    { id: 1, emoji: "🏰", size: "large", x: 10, y: 20 },
    { id: 2, emoji: "🤠", size: "medium", x: 80, y: 40 },
    { id: 3, emoji: "🧚‍♀️", size: "small", x: 15, y: 70 },
    { id: 4, emoji: "🥷", size: "medium", x: 70, y: 15 },
    { id: 5, emoji: "⏳", size: "large", x: 85, y: 80 },
    { id: 6, emoji: "☁️", size: "cloud", x: 30, y: 10 },
    { id: 7, emoji: "☁️", size: "cloud", x: 60, y: 60 },
    { id: 8, emoji: "⭐", size: "star", x: 25, y: 30 },
    { id: 9, emoji: "✨", size: "star", x: 75, y: 25 },
    { id: 10, emoji: "🌟", size: "star", x: 45, y: 85 },
  ];

  return (
    <div className="floating-islands-background">
      {islands.map((island) => (
        <div
          key={island.id}
          className={`floating-island ${island.size}`}
          style={{
            left: `${island.x}%`,
            top: `${island.y}%`,
            transform: `translateY(${scrollY * 0.1 * (island.id % 3)}px)`,
          }}
        >
          {island.emoji}
        </div>
      ))}

      <div className="gradient-overlay"></div>
    </div>
  );
};

export default FloatingIslands;
