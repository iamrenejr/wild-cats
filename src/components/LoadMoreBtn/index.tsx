import { Button } from "react-bootstrap";

import "./styles.scss";

interface LoadMoreBtnProps {
  onClick: () => void;
  style?: Style;
  text: string;
  visible?: boolean;
}
type LoadMoreBtn = (props: LoadMoreBtnProps) => JSX.Element;
export const LoadMoreBtn: LoadMoreBtn = (props) => {
  const { onClick, style, text, visible } = props;
  const className = visible ? "load-more-btn" : "load-more-btn-leaving";
  console.log("class name", className);
  return (
    <Button
      variant="outline-primary"
      style={style}
      className={className}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
