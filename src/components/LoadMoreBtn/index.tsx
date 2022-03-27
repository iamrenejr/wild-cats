import { Button } from "react-bootstrap";

import type { Style } from "../../types";

import "./styles.scss";

interface IProps {
  onClick: () => void;
  style?: Style;
  text: string;
  visible?: boolean;
}
type LoadMoreBtn = (props: IProps) => JSX.Element;
export const LoadMoreBtn: LoadMoreBtn = (props) => {
  const { onClick, style, text, visible } = props;
  const className = visible ? "load-more-btn" : "load-more-btn-leaving";
  return (
    <Button
      variant="outline-primary"
      style={style}
      className={className}
      onClick={onClick}
      data-testid="load-more-btn"
    >
      {text}
    </Button>
  );
};
