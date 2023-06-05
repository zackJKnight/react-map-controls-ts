import React, { useState, useRef, useEffect } from 'react';

interface CircleComponentProps {
  radius: number;
}

const CircleWithLabelComponent: React.FC<CircleComponentProps> = ({ radius }) => {
  const [angle, setAngle] = useState(0);
  const [mouseAngle, setMouseAngle] = useState(0);
  const circleRef = useRef<SVGCircleElement | null>(null);

  const getMouseAngle = (event: MouseEvent) => {
    if (!circleRef.current) return;
    const rect = circleRef.current.getBoundingClientRect();
    const x = rect.left + radius;
    const y = rect.top + radius;
    const diffX = event.clientX - x;
    const diffY = event.clientY - y;
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);
    if (distance > radius) return;
    let newAngle = (Math.atan2(diffY, diffX) * (180 / Math.PI) - 90) % 360; // Adjust the 0 degrees to the top
    if (newAngle < 0) newAngle += 360; // Convert negative angles to positive
    return newAngle;
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
        const newAngle = getMouseAngle(event);
        if (newAngle !== undefined) {
          setAngle(newAngle);
          setMouseAngle((newAngle + 180) % 360); //
        }
      };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  const labelAngle = (mouseAngle - 180) % 360;
  const circleX = radius + radius * Math.cos(labelAngle * Math.PI / 180);
  const circleY = radius + radius * Math.sin(labelAngle * Math.PI / 180);


  return (
    <div>
    <svg height='400' width='400'>
      <circle
        ref={circleRef}
        cx={radius + radius * 1.5}
        cy={radius + radius * 1.5}
        r={radius}
        stroke="black"
        strokeWidth={3}
        fill="transparent"
      />
      <circle
        cx={circleX + radius * 1.5}
        cy={circleY + radius * 1.5}
        r="20" // adjust this to change the size of the background circle
        fill="white" // adjust this to change the color of the background circle
      />
      <text x={circleX + radius * 1.5} y={circleY + radius * 1.5} textAnchor="middle" dominantBaseline="middle">
        {labelAngle.toFixed()}
      </text>
    </svg>
    </div>
  );
};

export default CircleWithLabelComponent;
