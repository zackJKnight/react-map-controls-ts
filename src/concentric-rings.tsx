import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web'
const usePolarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  const x = centerX + radius * Math.cos(angleInRadians);
  const y = centerY + radius * Math.sin(angleInRadians);

  return { x, y };
};

const ConcentricRings = ({ settings }) => {
  const [state, setState] = useState(settings);
  const centerX = 200;
  const centerY = 200;

  const updateSelectedValue = (index, angle) => {
    const newValue = Math.round(
      state[index].min +
        ((angle / 360) * (state[index].max - state[index].min))
    );

    setState(prevState => {
      const newState = [...prevState];
      newState[index].selected = newValue;
      return newState;
    });
  };

  const handleMouseDown = (e, index) => {
    e.preventDefault();

    const mouseMoveHandler = e => {

      const dx = centerX - e.clientX;
      const dy = centerY - e.clientY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const normalizedAngle = (angle + 360) % 360;

      updateSelectedValue(index, normalizedAngle);
    };

    const mouseUpHandler = () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };

    window.addEventListener('mousemove', mouseMoveHandler);
    window.addEventListener('mouseup', mouseUpHandler);
  };

  const [springs, api] = useSpring(() => ({
    from: { r: 10, cursor: 'grab' },
  }))

  const handleMouseOver = () => {
  api.start({
    from: {
      r: 10,
    },
    to: {
      r: 20,
    },
  })
}

const handleMouseOut = () => {
  api.start({
    from: {
      r: 20,
    },
    to: {
      r: 10,
    },
  })
}

  return (
    <div>
      <svg width="400" height="400">
        {state.map((item, index) => {
          const radius = 60 + index * 60;
          const angle =
            ((item.selected - item.min) * 360) / (item.max - item.min);
          const { x, y } = usePolarToCartesian(centerX, centerY, radius, angle);

          return (
            <React.Fragment key={item.label}>
              <circle
                cx={centerX}
                cy={centerY}
                r={radius}
                strokeWidth="1"
                stroke="currentColor"
                fill="none"
              />
              <animated.circle
                cx={x}
                cy={y}
                fill="orange"
                onMouseDown={e => handleMouseDown(e, index)}
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                style={{

                  ...springs,
                }}
              />
            </React.Fragment>
          );
        })}
      </svg>
        {state.map((item, index) => (
          <div key={item.label}>
            {item.label}: {item.selected}
          </div>
        ))}
    </div>
  );
};

export default ConcentricRings;
