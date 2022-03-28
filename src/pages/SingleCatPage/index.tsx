import { memo, useContext, useState } from "react";
import { Button } from "react-bootstrap";

import "./styles.scss";

import { getUrlParam } from "../../lib/utils/getUrlParam";
import { GlobalContext } from "../../lib/hooks/useGlobalContext/context";

import type { UrlRecord } from "../../types";

const SingleCatPage = () => {
  const [classNames, setClassNames] = useState("single-cat-page");
  const {
    state: { selectedCat, catData },
  } = useContext(GlobalContext);

  // Get 'c' from url params to obtain cat ID
  const catId = getUrlParam("c");

  // On press back button, animate leaving single cat page
  // Pressing via other ways just skips the animation
  const onBack = () => {
    setClassNames("single-cat-page single-cat-page-leaving");
    setTimeout(() => history.back(), 1000);
  };

  // Find the cat's details by ID
  const catDetails = catData?.[selectedCat]?.filter?.(
    (details: UrlRecord) => details.id === catId
  )?.[0];

  // If cat is not found, render nothing
  if (catDetails === undefined) {
    return null;
  }

  return (
    <div data-testid="single-cat-page-root" className={classNames}>
      <Button variant="dark" onClick={onBack}>
        Back
      </Button>
      <div className="cat-portrait-and-information">
        <div className="cat-portrait">
          <img className="can-grow" src={catDetails.url} />
        </div>
        <div className="cat-information">
          <div className="cat-information-title">
            <strong className="can-grow">{selectedCat}</strong>
            &nbsp;
            <i className="can-grow">({catDetails.origin})</i>
          </div>
          <div className="cat-information-subtitle can-grow">
            {catDetails.temperament}
          </div>
          <div className="cat-information-body can-grow">
            {catDetails.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(SingleCatPage);
