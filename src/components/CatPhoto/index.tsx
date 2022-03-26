import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

import "./styles.scss";

interface CatPhotoProps {
  style?: Style;
  src: string;
}
type CatPhoto = (props: CatPhotoProps) => JSX.Element;
export const CatPhoto: CatPhoto = (props) => {
  const [opacity, setOpacity] = useState(0);
  const [classNames, setClassNames] = useState("cat-image cat-image-animation");
  const { src, style } = props;
  useEffect(() => {
    setTimeout(() => setClassNames("cat-image cat-image-animation-over"), 2100);
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
