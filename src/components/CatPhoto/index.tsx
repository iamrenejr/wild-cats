import { useCallback, useState } from "react";
import { Image } from "react-bootstrap";

import type { Style } from "../../types";

import "./styles.scss";

interface IProps {
  style?: Style;
  src: string;
}
type CatPhoto = (props: IProps) => JSX.Element;
export const CatPhoto: CatPhoto = (props) => {
  const [classNames, setClassNames] = useState("cat-image");
  const { src, style } = props;

  // Animate only upon image loading
  // After CSS is done animating, remove animation class
  // This prevents the animation from restarting upon :hover
  const startAnimation = useCallback(() => {
    setClassNames("cat-image cat-image-animation");
    setTimeout(() => setClassNames("cat-image cat-image-animation-over"), 2050);
  }, []);

  return (
    <Image
      src={src}
      style={style}
      className={classNames}
      data-testid="cat-photo"
      onLoad={startAnimation}
    />
  );
};
