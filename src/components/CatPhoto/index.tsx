import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

import type { Style } from "../../types";

import "./styles.scss";

interface IProps {
  style?: Style;
  src: string;
}
type CatPhoto = (props: IProps) => JSX.Element;
export const CatPhoto: CatPhoto = (props) => {
  const [opacity, setOpacity] = useState(0);
  const [classNames, setClassNames] = useState("cat-image cat-image-animation");
  const { src, style } = props;

  // After CSS is done animating, remove animation class
  // This prevents the animation from restarting upon :hover
  useEffect(() => {
    setTimeout(() => setClassNames("cat-image cat-image-animation-over"), 2050);
  }, []);

  return (
    <Image
      src={src}
      style={{ ...style, opacity }}
      className={classNames}
      onLoad={() => setOpacity(1)}
    />
  );
};
