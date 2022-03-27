import { memo, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash/fp";

import "./styles.scss";

import { getUrlParam } from "../../lib/utils/getUrlParam";
import { useGetUrlMap } from "../../lib/hooks/useGetUrlMap";
import { GlobalContext } from "../../lib/hooks/useGlobalContext/context";
import { CatPhoto } from "../../components/CatPhoto";
import { CatGallery } from "../../components/CatGallery";
import { SelectBox } from "../../components/SelectBox";
import { LoadMoreBtn } from "../../components/LoadMoreBtn";
import { ToastBox } from "../../components/ToastBox";

import type { RenderItem } from "../../components/CatGallery";
import type { SelectOnChangeHandler, UrlRecord } from "../../types";

const Homepage = () => {
  const [page, setPage] = useState(1);
  const [showLoadBtn, setShowLoadBtn] = useState(true);
  const [classNames, setClassNames] = useState("homepage");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const {
    state: { selectedCat, breeds, catData },
    selectCat,
    getBreedData,
    getCatDataByBreed,
  } = useContext(GlobalContext);

  const navigate = useNavigate();

  // On mount, populate the select bar options
  useEffect(() => {
    (async () => {
      try {
        await getBreedData();
      } catch {
        setShowErrorToast(true);
      }
    })();
  }, []);

  // On choosing a breed from select bar
  const onSelect: SelectOnChangeHandler = async (ev) => {
    try {
      const newPage = 1;
      const name = ev.target.value;
      const { id: breedId } = breeds[name];
      selectCat(name);
      setPage(newPage);
      setShowLoadBtn(true);
      await getCatDataByBreed(name, breedId, newPage);
    } catch {
      setShowErrorToast(true);
    }
  };

  // imgs is the raw data for the gallery
  const imgMap = catData[selectedCat];
  const imgs = useGetUrlMap(imgMap || []);

  // On loading more images of cats
  const onLoadMore = async () => {
    try {
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
    } catch {
      setShowErrorToast(true);
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

  // Get 'e' from url params to obtain error
  const fromError = getUrlParam("e");

  // Reset the app on close of error message
  const onToastClose = () => {
    setTimeout(() => {
      location.href = "/";
    }, 500);
  };

  return (
    <div className={classNames}>
      {fromError || showErrorToast ? (
        <ToastBox
          text="Apologies but we could not load new cats for you at this time! Miau!"
          onClose={onToastClose}
        />
      ) : null}
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
            isLoading={imgMap === undefined}
          />
        </div>
      )}
    </div>
  );
};

export default memo(Homepage);
