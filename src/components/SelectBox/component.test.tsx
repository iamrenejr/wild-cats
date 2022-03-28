import { fireEvent, render, screen } from "@testing-library/react";
import { SelectBox } from "./";

describe("Select Box", () => {
  const placeholderText = "placeholder";

  const twoOptions = {
    cat1: { id: "cat1", name: "Option1" },
    cat2: { id: "cat2", name: "Option2" },
  };

  const threeOptions = {
    Option1: { id: "Option1", name: "Option1" },
    Option2: { id: "Option2", name: "Option2" },
    Option3: { id: "Option3", name: "Option3" },
  };

  it("should render the select bar", () => {
    const { getByTestId } = render(
      <SelectBox
        selected=""
        data={twoOptions}
        onSelect={jest.fn()}
        placeholder="Placeholder"
      />
    );
    const selectBox = getByTestId("select-box");
    expect(selectBox).toBeTruthy();
  });

  it("should have the placeholder selected by default", () => {
    const { getByTestId } = render(
      <SelectBox
        selected=""
        data={twoOptions}
        onSelect={jest.fn()}
        placeholder={placeholderText}
      />
    );
    const selectBox = getByTestId("select-box") as HTMLSelectElement;
    expect(selectBox.value).toBe("");
  });

  it("should render the right number of options", () => {
    const { getAllByRole } = render(
      <SelectBox
        selected=""
        data={twoOptions}
        onSelect={jest.fn()}
        placeholder={placeholderText}
      />
    );
    expect(getAllByRole("option").length).toBe(3);
  });

  it("should select the option provided in its props", () => {
    const { getAllByTestId } = render(
      <SelectBox
        selected="Option2"
        data={threeOptions}
        onSelect={jest.fn()}
        placeholder={placeholderText}
      />
    );
    const options = getAllByTestId("select-box-option") as HTMLOptionElement[];
    expect(options[0].selected).toBe(false);
    expect(options[1].selected).toBe(true);
    expect(options[2].selected).toBe(false);
  });

  it("should call the onSelect function from its props", () => {
    const onSelect = jest.fn();
    render(
      <SelectBox
        selected="Option2"
        data={threeOptions}
        onSelect={onSelect}
        placeholder={placeholderText}
      />
    );
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Option3" },
    });
    expect(onSelect).toHaveBeenCalled();
  });
});
