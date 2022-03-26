import _ from "lodash";

import "./styles.scss";

interface SelectBoxProps {
  style?: Style;
  optionStyle?: Style;
  selected: string;
  data: Record<string, ICatBreedsData>;
  onSelect: SelectOnChangeHandler;
  placeholder: string;
}
type SelectBox = (props: SelectBoxProps) => JSX.Element;
export const SelectBox: SelectBox = (props) => {
  const { data, onSelect, optionStyle, placeholder, selected, style } = props;
  return (
    <select
      style={style}
      className="select-bar"
      onChange={onSelect}
      value={selected}
    >
      {_.isEmpty(selected) ? (
        <option style={optionStyle} value="" key="placeholder">
          {placeholder}
        </option>
      ) : null}
      {_.values(data).map(({ name }) => (
        <option style={optionStyle} value={name} key={name}>
          {name}
        </option>
      ))}
    </select>
  );
};
