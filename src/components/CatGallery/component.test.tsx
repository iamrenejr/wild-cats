import { fireEvent, render, screen } from "@testing-library/react";
import { CatGallery } from "./";
import _ from "lodash";

describe("Cat Gallery", () => {
  const blankData = [{ id: "", url: "" }];

  const goodData = [
    { id: "Cat1", url: "/cat1" },
    { id: "Cat2", url: "/cat2" },
    { id: "Cat3", url: "/cat3" },
  ];

  const badData = [
    { id: undefined, url: "/cat1" },
    { id: undefined, url: "/cat2" },
    { id: undefined, url: "/cat3" },
  ];

  it("should render the gallery", () => {
    const { getByTestId } = render(
      <CatGallery
        data={blankData}
        renderItem={jest.fn()}
        isLoading={false}
        onViewPhotoDetails={jest.fn()}
      />
    );
    const catGallery = getByTestId("gallery-item");
    expect(catGallery).toBeTruthy();
  });

  it("should show loading if the props say it is", () => {
    const { getByTestId } = render(
      <CatGallery
        data={blankData}
        renderItem={jest.fn()}
        isLoading
        onViewPhotoDetails={jest.fn()}
      />
    );
    const catGallery = screen.queryByTestId("gallery-item");
    expect(catGallery).toBe(null);

    const loader = getByTestId("loader");
    const { classList: classLoader } = loader;
    expect(_.values(classLoader).includes("loader-fade-in")).toBe(true);
    expect(_.values(classLoader).includes("hidden")).toBe(false);

    const noDataMsg = getByTestId("no-data-msg");
    const { classList: classNoDataMsg } = noDataMsg;
    expect(_.values(classNoDataMsg).includes("hidden")).toBe(true);
    expect(_.values(classNoDataMsg).includes("no-data-fade-in")).toBe(false);
  });

  it("should show no data message if there is no data and it is done loading", () => {
    const { getByTestId } = render(
      <CatGallery
        data={[]}
        renderItem={jest.fn()}
        isLoading={false}
        onViewPhotoDetails={jest.fn()}
      />
    );
    const catGallery = screen.queryByTestId("gallery-item");
    expect(catGallery).toBe(null);

    const loader = getByTestId("loader");
    const { classList: classLoader } = loader;
    expect(_.values(classLoader).includes("hidden")).toBe(true);
    expect(_.values(classLoader).includes("loader-fade-in")).toBe(false);

    const noDataMsg = getByTestId("no-data-msg");
    const { classList: classNoDataMsg } = noDataMsg;
    expect(_.values(classNoDataMsg).includes("no-data-fade-in")).toBe(true);
    expect(_.values(classNoDataMsg).includes("hidden")).toBe(false);
  });

  it("should render the right number of photos", () => {
    const renderItem = jest.fn();
    render(
      <CatGallery
        data={goodData}
        renderItem={renderItem}
        isLoading={false}
        onViewPhotoDetails={jest.fn()}
      />
    );
    const catGallery = screen.queryAllByTestId("gallery-item");
    expect(catGallery.length).toBe(3);
    expect(renderItem).toHaveBeenCalledTimes(3);
  });

  it("should render nothing if none of the data has ids", () => {
    const renderItem = jest.fn();
    render(
      <CatGallery
        data={badData}
        renderItem={renderItem}
        isLoading={false}
        onViewPhotoDetails={jest.fn()}
      />
    );
    const catGallery = screen.queryAllByTestId("gallery-item");
    expect(catGallery.length).toBe(0);
    expect(renderItem).toHaveBeenCalledTimes(0);
  });

  it("should call the onViewPhotoDetails function from props", () => {
    const onViewPhotoDetails = jest.fn();
    const { getAllByTestId } = render(
      <CatGallery
        data={goodData}
        renderItem={jest.fn()}
        isLoading={false}
        onViewPhotoDetails={onViewPhotoDetails}
      />
    );
    const catGallery = getAllByTestId("gallery-item-btn")[0];
    fireEvent.click(catGallery);
    expect(onViewPhotoDetails).toHaveBeenCalled();
  });
});
