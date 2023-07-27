import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => {
  return value.trim() === "";
};
const isNotFiveChars = (value) => {
  return value.length !== 5;
};

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredSteetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid =
      !isNotFiveChars(enteredPostalCode) && !isEmpty(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredSteetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };
  const nameControlClasses = (propertyName) => {
    return `${classes.control} ${
      formInputsValidity[propertyName] ? "" : classes.invalid
    }`;
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses("name")}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputsValidity.name && <p>Please Enter a valid name.</p>}
      </div>
      <div className={nameControlClasses("street")}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputsValidity.street && <p>Please Enter a valid street.</p>}
      </div>
      <div className={nameControlClasses("postalCode")}>
        <label htmlFor="postal">Postal Code</label>
        <input ref={postalCodeInputRef} type="text" id="postal" />
        {!formInputsValidity.postalCode && (
          <p>Please Enter a valid postal code (5 characters long).</p>
        )}
      </div>
      <div className={nameControlClasses("city")}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputsValidity.city && <p>Please Enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
