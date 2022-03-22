import React from "react";

function PopupWithForm(props) {
  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [props]);

  function handleOverClickClose(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      props.onClose();
    }
  }

  return (
    <article
      onClick={handleOverClickClose}
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
  );
}

export default PopupWithForm;
