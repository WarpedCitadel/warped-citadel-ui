import '../../styles/Panel.css';

const Panel = ({ children, title }) => {
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