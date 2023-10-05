import { nanoid } from "nanoid";
import css from "./ContactsForm.module.css";
import Button from "./button/Button";
import PropTypes from "prop-types";
import { useState } from "react";
const patternName = "^[a-zA-Z]+(([' \u2013][a-zA-Z])?[a-zA-Z]*)*$";
const patternTel = "^\\+48\\d{3}\\d{3}\\d{3}$";

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", number: "" });

  const handleInputChanche = (ev) => {
    const { name, value } = ev.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    onSubmit(formData);
    form.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          onChange={handleInputChanche}
          id={nanoid()}
          type="text"
          name="name"
          pattern={patternName}
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label className={css.label}>
        Number
        <input
          className={css.input}
          onChange={handleInputChanche}
          type="tel"
          name="number"
          pattern={patternTel}
          placeholder="+48XXXXXXXXX"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <Button typebutton={"button_add"}>ADD CONTACTS</Button>
    </form>
  );
};
Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Form;
