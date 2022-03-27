import _ from "lodash";

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
  return (
    <select
      style={style}
      className="select-bar"
      onChange={onSelect}
      value={selected}
    >
      {_.isEmpty(selected) ? (
        <option value="" key="placeholder">
          {placeholder}
        </option>
      ) : null}
      {_.values(data).map(({ name }) => (
        <option value={name} key={name}>
          {name}
        </option>
      ))}
    </select>
  );
};
