import "./grid.scss";

export function GridItem({ children, ...rest }) {
  return (
    <div className="grid-item" {...rest}>
      {children}
    </div>
  );
}
