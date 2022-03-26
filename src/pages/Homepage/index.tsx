import { memo, useContext, useEffect, useState } from "react";
import _ from "lodash/fp";

import "./styles.scss";

import { useGetUrlMap } from "../../lib/hooks/useGetUrlMap";
import { GlobalContext } from "../../lib/hooks/useGlobalContext/context";
import { CatPhoto } from "../../components/CatPhoto";
import { CatGallery } from "../../components/CatGallery";
import { SelectBox } from "../../components/SelectBox";

const Homepage = () => {
  const [page, setPage] = useState(1);
  const {
    state: { selectedCat, breeds, catData },
    getBreedData,
    selectCat,
    getCatDataByBreed,
  } = useContext(GlobalContext);
  useEffect(getBreedData, []);
  const onSelect: SelectOnChangeHandler = (ev) => {
    const name = ev.target.value;
    selectCat(name);
    const { id: breedId } = breeds[name];
    getCatDataByBreed(name, breedId, page);
    setPage(1);
  };
  const imageMap = catData[selectedCat] || [];
  console.log("image Map", imageMap);
  const imgs = useGetUrlMap(imageMap);
  return (
    <div className="homepage">
      <div className="select-box-wrapper">
        <SelectBox
          data={breeds}
          onSelect={onSelect}
          selected={selectedCat}
          placeholder="See Cat Photos!"
        />
      </div>
      {_.isEmpty(selectedCat) ? null : (
        <div className="gallery-wrapper">
          <CatGallery
            data={imgs}
            renderItem={({ id, url }) =>
              _.isString(url) ? <CatPhoto src={url} key={id} /> : null
            }
          />
        </div>
      )}
    </div>
  );
};

export default memo(Homepage);
