import React from 'react';
import Draggable from 'react-draggable';

type Props = {
  children: React.ReactNode;
};

const DraggableIcon: React.FC<Props> = ({ children }) => {
  return (
    <Draggable>
      <div>
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableIcon;
