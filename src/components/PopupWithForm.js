import React from "react";
import Popup from "./Popup";

function PopupWithForm(props) {
  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose}>
      <article
        className={`popup popup_type_${props.name} ${
          props.isOpen ? "popup_opened" : ""
        }`}
        aria-label="Попап"
      >
        <div className="popup__container">
          <h2 className={`popup__title popup__title_type_${props.name}`}>
            {props.title}
          </h2>
          <form
            className="popup__form"
            name={`${props.name}Form`}
            onSubmit={props.onSubmit}
            noValidate
          >
            {props.children}
            <input
              type="submit"
              value={props.buttonText}
              className="btn-hover popup__save-btn"
            />
          </form>
          <button
            onClick={props.onClose}
            className="popup__close-btn btn-hover popup__close-edit"
            type="button"
          ></button>
        </div>
      </article>
    </Popup>
  );
}

export default PopupWithForm;
