import _ from "lodash";

import type { ICatBreedsData, SelectOnChangeHandler, Style } from "../../types";

import "./styles.scss";

interface IProps {
  style?: Style;
  selected: string;
  data: Record<string, ICatBreedsData>;
  onSelect: SelectOnChangeHandler;
  placeholder: string;
}
type SelectBox = (props: IProps) => JSX.Element;
export const SelectBox: SelectBox = (props) => {
  const { data, onSelect, placeholder, selected, style } = props;

  // Remove placeholder from the list if data is present
  return (
    <select
      style={style}
      className="select-bar"
      onChange={onSelect}
      value={selected}
      data-testid="select-box"
    >
      {_.isEmpty(selected) ? (
        <option data-testid="select-box-option" value="" key="placeholder">
          {placeholder}
        </option>
      ) : null}
      {_.values(data).map(({ name }) => (
        <option data-testid="select-box-option" value={name} key={name}>
          {name}
        </option>
      ))}
    </select>
  );
};
