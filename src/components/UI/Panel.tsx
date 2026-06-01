import React from 'react';
import '../../styles/Panel.css';

interface PanelProps {
  children: React.ReactNode; 
  title?: string;
}

const Panel: React.FC<PanelProps> = ({ children, title }) => {
  return (
    <div className="panel-container">
      {title && <h2 className="panel-title">{title}</h2>}
      <div className="panel-content">
        {children}
      </div>
    </div>
  );
};

export default Panel;