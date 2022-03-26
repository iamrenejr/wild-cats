import { map } from "fp-ts/ReadonlyArray";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./styles.scss";

type RenderItemProps = UrlRecord & { style?: Style };
interface CatGalleryProps {
  data: readonly UrlRecord[];
  renderItem: (item: RenderItemProps) => JSX.Element | null;
}
type CatGallery = (props: CatGalleryProps) => JSX.Element;
export const CatGallery: CatGallery = (props) => {
  const { data, renderItem } = props;
  type DecorateItem = (item: RenderItemProps) => JSX.Element;
  const decorateItem: DecorateItem = ({ id, url }) => {
    return (
      <div key={id} className="gallery-item">
        {renderItem({ id, url })}
        <Link to="/single-cat-page">
          <Button variant="primary">View details</Button>
        </Link>
      </div>
    );
  };
  const renderItems = map(decorateItem);
  return <>{renderItems(data)}</>;
};
