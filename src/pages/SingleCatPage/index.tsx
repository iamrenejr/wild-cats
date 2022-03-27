import { memo, useContext, useState } from "react";
import { Button } from "react-bootstrap";

import "./styles.scss";

import { GlobalContext } from "../../lib/hooks/useGlobalContext/context";

const SingleCatPage = () => {
  const [classNames, setClassNames] = useState("single-cat-page");
  const {
    state: { selectedCat, catData },
  } = useContext(GlobalContext);

  const urlParams = new URLSearchParams(location.search);
  const catId = urlParams.get("c");

  const onBack = () => {
    setClassNames("single-cat-page single-cat-page-leaving");
    setTimeout(() => history.back(), 1000);
  };

  const catDetails = catData?.[selectedCat]?.filter?.(
    (details: UrlRecord) => details.id === catId
  )?.[0];

  if (catDetails === undefined) {
    location.href = "/?e=1";
    return null;
  }

  return (
    <div className={classNames}>
      <Button variant="dark" onClick={onBack}>
        Back
      </Button>
      <div className="cat-portrait-and-information">
        <div className="cat-portrait">
          <img src={catDetails.url} />
        </div>
        <div className="cat-information">
          <div className="cat-information-title">
            <strong>{selectedCat}</strong>
            &nbsp;
            <i>({catDetails.breeds[0].origin})</i>
          </div>
          <div className="cat-information-subtitle">
            {catDetails.breeds[0].temperament}
          </div>
          <div className="cat-information-body">
            {catDetails.breeds[0].description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SingleCatPage);
