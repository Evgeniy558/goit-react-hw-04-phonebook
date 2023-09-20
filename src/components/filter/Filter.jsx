import css from "./Filter.module.css";
import PropTypes from "prop-types";
const Filter = ({ onChange }) => {
  return (
    <div className={css.search_container}>
      <label className={css.label}>
        {" "}
        Find contacts by name
        <input
          className={css.input}
          type="text"
          name="search"
          onChange={onChange}
        ></input>
      </label>
    </div>
  );
};
Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
export default Filter;
