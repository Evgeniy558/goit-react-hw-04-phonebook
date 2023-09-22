import css from "./button.module.css";
import PropTypes from "prop-types";

const Button = ({ children, typebutton, onClick }) => {
  const classButton =
    typebutton === "button_add"
      ? css["button_add"]
      : typebutton === "button_del"
      ? css["button_del"]
      : css["button"];

  return (
    <div className={css.wrapper}>
      <button className={`${css.button} ${classButton}`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

Button.propTypes = {
  typebutton: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
export default Button;
