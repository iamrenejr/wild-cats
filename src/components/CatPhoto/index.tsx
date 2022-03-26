import { useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";

import "./styles.scss";

interface CatPhotoProps {
  style?: Style;
  src: string;
}
type CatPhoto = (props: CatPhotoProps) => JSX.Element;
export const CatPhoto: CatPhoto = (props) => {
  const [opacity, setOpacity] = useState(0);
  const { src, style } = props;
  return (
    <Link to="/single-cat-page">
      <Image
        src={src}
        style={{ ...style, opacity }}
        className="cat-image"
        onLoad={() => setOpacity(1)}
      />
    </Link>
  );
};
