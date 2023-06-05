import React, { useState, useRef, useEffect } from 'react';

interface CircleComponentProps {
  radius: number;
}

const CircleWithLabelCorrected: React.FC<CircleComponentProps> = ({ radius }) => {
  const [mouseAngle, setMouseAngle] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const getMouseAngle = (event: MouseEvent) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.left + radius * 2.5; // The actual center of the circle
    const centerY = rect.top + radius * 2.5; // The actual center of the circle
    const diffX = event.clientX - centerX;
    const diffY = event.clientY - centerY;
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);
    if (distance > radius) return;
    let newAngle = (Math.atan2(-diffY, diffX) * (180 / Math.PI) + 360) % 360; // Adjust the 0 degrees to the top
    return newAngle;
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newAngle = getMouseAngle(event);
      if (newAngle !== undefined) {
        setMouseAngle(newAngle);
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  let labelCircle, labelText;

  if (mouseAngle !== null) {
    const labelAngle = (360 - mouseAngle) % 360; // Label is always opposite to the mouse
    const circleX = radius * Math.cos(labelAngle * Math.PI / 180);
    const circleY = radius * Math.sin(labelAngle * Math.PI / 180);
    
    labelCircle = <circle
                    cx={circleX + radius * 2.5}
                    cy={circleY + radius * 2.5}
                    r="20" // adjust this to change the size of the background circle
                    fill="white" // adjust this to change the color of the background circle
                  />
    
    labelText = <text x={circleX + radius * 2.5} y={circleY + radius * 2.5} textAnchor="middle" dominantBaseline="middle" >
                  {mouseAngle.toFixed(0)}
                </text>
  }

  return (
    <div contentEditable='false'>
      <svg ref={svgRef} height='400' width='400'>
        <circle
          cx={radius + radius * 1.5}
          cy={radius + radius * 1.5}
          r={radius}
          stroke="black"
          strokeWidth={3}
          fill="transparent"
        />
        {labelCircle}
        {labelText}
      </svg>
    </div>
  );
};

export default CircleWithLabelCorrected;
