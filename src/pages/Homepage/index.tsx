import { memo, useContext, useEffect, useState } from "react";
import _ from "lodash/fp";

import "./styles.scss";

import { useGetUrlMap } from "../../lib/hooks/useGetUrlMap";
import { GlobalContext } from "../../lib/hooks/useGlobalContext/context";
import { CatPhoto } from "../../components/CatPhoto";
import { CatGallery } from "../../components/CatGallery";
import { SelectBox } from "../../components/SelectBox";
import { LoadMoreBtn } from "../../components/LoadMoreBtn";

const Homepage = () => {
  const [page, setPage] = useState(1);
  const [showLoadBtn, setShowLoadBtn] = useState(true);
  const {
    state: { selectedCat, breeds, catData },
    getBreedData,
    selectCat,
    getCatDataByBreed,
  } = useContext(GlobalContext);

  useEffect(getBreedData, []);

  const onSelect: SelectOnChangeHandler = (ev) => {
    const newPage = 1;
    const name = ev.target.value;
    selectCat(name);
    const { id: breedId } = breeds[name];
    getCatDataByBreed(name, breedId, newPage);
    setPage(newPage);
    setShowLoadBtn(true);
  };

  const imageMap = catData[selectedCat] || [];
  const imgs = useGetUrlMap(imageMap);

  const onLoadMore = async () => {
    const newPage = page + 1;
    setPage(newPage);
    const { id: breedId } = breeds[selectedCat];
    const newCatData = await getCatDataByBreed(selectedCat, breedId, newPage);
    const newCats =
      _.differenceBy(
        imgs.map((x) => x.id),
        newCatData.map((x: UrlRecord) => x.id),
        "id"
      ) || [];
    if (newCats.length === 0) {
      setShowLoadBtn(false);
    }
  };

  return (
    <div className="homepage">
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
            data={_.reverse(imgs)}
            renderItem={({ id, url, style }) =>
              _.isString(url) ? (
                <CatPhoto style={style} src={url} key={id} />
              ) : null
            }
          />
        </div>
      )}
    </div>
  );
};

export default memo(Homepage);
