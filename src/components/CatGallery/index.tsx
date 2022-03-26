import { map } from "fp-ts/ReadonlyArray";

import "./styles.scss";

interface CatGalleryProps {
  data: readonly UrlRecord[];
  renderItem: (item: UrlRecord) => JSX.Element | null;
}
type CatGallery = (props: CatGalleryProps) => JSX.Element;
export const CatGallery: CatGallery = (props) => {
  const { data, renderItem } = props;
  const renderItems = map(renderItem);
  return <>{renderItems(data)}</>;
};
