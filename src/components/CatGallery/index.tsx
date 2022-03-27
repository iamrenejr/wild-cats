import { map } from "fp-ts/ReadonlyArray";
import { Button } from "react-bootstrap";

import "./styles.scss";

type RenderItemProps = UrlRecord & { style?: Style };
interface CatGalleryProps {
  data: readonly UrlRecord[];
  onViewPhotoDetails: (path: string) => void;
  renderItem: (item: RenderItemProps) => JSX.Element | null;
}
type CatGallery = (props: CatGalleryProps) => JSX.Element;
export const CatGallery: CatGallery = (props) => {
  const { data, onViewPhotoDetails, renderItem } = props;

  type DecorateItem = (item: RenderItemProps) => JSX.Element | null;
  const decorateItem: DecorateItem = ({ id, url }) => {
    if (id === undefined) return null;

    const onPress = (path: string) => () => onViewPhotoDetails(path);

    return (
      <div key={id} className="gallery-item">
        {renderItem({ id, url })}
        <Button onClick={onPress(`/single-cat-page?c=${id}`)} variant="primary">
          View details
        </Button>
      </div>
    );
  };

  const renderItems = map(decorateItem);

  return <>{renderItems(data)}</>;
};
