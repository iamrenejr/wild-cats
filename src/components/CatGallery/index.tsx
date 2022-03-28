import { Button } from "react-bootstrap";
import _ from "lodash";

import type { Style, UrlRecord } from "../../types";

import "./styles.scss";

type RenderItemProps = UrlRecord & { style?: Style };
export type RenderItem = (item: RenderItemProps) => JSX.Element | null;

interface IProps {
  data: readonly UrlRecord[] | [];
  onViewPhotoDetails: (path: string) => void;
  renderItem: RenderItem;
  isLoading: boolean;
}
type CatGallery = (props: IProps) => JSX.Element;
export const CatGallery: CatGallery = (props) => {
  const { data, isLoading, onViewPhotoDetails, renderItem } = props;

  // Handle loading og the gallery
  // Handle when no images are found
  const noImageData = !isLoading && data.length === 0;
  if (isLoading || noImageData) {
    const loadingClassName = isLoading ? "loader-fade-in" : "hidden";
    const noDataClassName = noImageData ? "no-data-fade-in" : "hidden";
    return (
      <>
        <div data-testid="loader" className={loadingClassName}>
          <div />
        </div>
        <div data-testid="no-data-msg" className={noDataClassName}>
          No cats found!
        </div>
      </>
    );
  }

  // The gallery applies a standard look to the passed-in prop
  // by wrapping each one with the same container
  const decorateItem: RenderItem = ({ id, url }) => {
    if (id === undefined) return null;
    const onPress = (path: string) => () => onViewPhotoDetails(path);

    return (
      <div data-testid="gallery-item" key={id} className="gallery-item">
        {renderItem({ id, url })}
        <Button
          data-testid="gallery-item-btn"
          onClick={onPress(`/single-cat-page?c=${id}`)}
          variant="primary"
        >
          View details
        </Button>
      </div>
    );
  };

  // Generate an array of JSX Elements from an array of data
  return <>{_.map(data, decorateItem)}</>;
};
