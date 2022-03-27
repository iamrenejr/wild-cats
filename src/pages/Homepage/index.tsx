import { memo, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash/fp";

import "./styles.scss";

import { useGetUrlMap } from "../../lib/hooks/useGetUrlMap";
import { GlobalContext } from "../../lib/hooks/useGlobalContext/context";
import { CatPhoto } from "../../components/CatPhoto";
import { CatGallery } from "../../components/CatGallery";
import { SelectBox } from "../../components/SelectBox";
import { LoadMoreBtn } from "../../components/LoadMoreBtn";

import type { RenderItem } from "../../components/CatGallery";

const Homepage = () => {
  const [page, setPage] = useState(1);
  const [showLoadBtn, setShowLoadBtn] = useState(true);
  const [classNames, setClassNames] = useState("homepage");
  const {
    state: { selectedCat, breeds, catData },
    getBreedData,
    selectCat,
    getCatDataByBreed,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  // On mount, populate the select bar options
  useEffect(getBreedData, []);

  // On choosing a breed from select bar
  const onSelect: SelectOnChangeHandler = (ev) => {
    const newPage = 1;
    const name = ev.target.value;
    const { id: breedId } = breeds[name];
    selectCat(name);
    getCatDataByBreed(name, breedId, newPage);
    setPage(newPage);
    setShowLoadBtn(true);
  };

  // imgs is the raw data for the gallery
  const imgs = useGetUrlMap(catData[selectedCat] || []);

  // On loading more images of cats
  const onLoadMore = async () => {
    const newPage = page + 1;
    setPage(newPage);

    const { id: breedId } = breeds[selectedCat];
    const newCatData = await getCatDataByBreed(selectedCat, breedId, newPage);
    const newCats =
      _.differenceBy(
        imgs.map((x: UrlRecord) => x.id),
        newCatData.map((x: UrlRecord) => x.id),
        "id"
      ) || [];

    // If there are no more new cats, hide load button
    if (newCats.length === 0) {
      setShowLoadBtn(false);
    }
  };

  // On clicking View Details button
  // Animate homepage leaving
  // Then navigate to new page
  type OnViewPhotoDetails = (path: string) => void;
  const onViewPhotoDetails: OnViewPhotoDetails = (path) => {
    setClassNames("homepage homepage-leaving");
    setTimeout(() => navigate(path), 1000);
  };

  // Render CatPhoto as gallery items
  const renderGalleryPhoto: RenderItem = ({ id, url, style }) =>
    _.isString(url) ? <CatPhoto style={style} src={url} key={id} /> : null;

  return (
    <div className={classNames}>
      <div className="select-box-wrapper">
        <SelectBox
          data={breeds}
          onSelect={onSelect}
          selected={selectedCat}
          placeholder="See Cat Photos!"
        />
        {!_.isEmpty(selectedCat) ? (
          <div className="load-more-btn-wrapper">
            <LoadMoreBtn
              text="Load more"
              onClick={onLoadMore}
              visible={showLoadBtn}
            />
          </div>
        ) : null}
      </div>
      {_.isEmpty(selectedCat) ? null : (
        <div className="gallery-wrapper">
          <CatGallery
            data={imgs}
            renderItem={renderGalleryPhoto}
            onViewPhotoDetails={onViewPhotoDetails}
          />
        </div>
      )}
    </div>
  );
};

export default memo(Homepage);
