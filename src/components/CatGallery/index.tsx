import { Button } from "react-bootstrap";
import _ from "lodash";

import "./styles.scss";

type RenderItemProps = UrlRecord & { style?: Style };
export type RenderItem = (item: RenderItemProps) => JSX.Element | null;

interface IProps {
  data: readonly UrlRecord[];
  onViewPhotoDetails: (path: string) => void;
  renderItem: RenderItem;
}
type CatGallery = (props: IProps) => JSX.Element;
export const CatGallery: CatGallery = (props) => {
  const { data, onViewPhotoDetails, renderItem } = props;

  // The gallery applies a standard look to the passed-in prop
  // by wrapping each one with the same container
  const decorateItem: RenderItem = ({ id, url }) => {
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

  // Generate an array of JSX Elements from an array of data
  return <>{_.map(data, decorateItem)}</>;
};
