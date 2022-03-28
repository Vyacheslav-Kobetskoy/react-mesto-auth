import React from "react";
import errorRegister from "../images/errorRegister.svg";
import completeRegister from "../images/completeRegister.svg";
import Popup from "./Popup";

function InfoTooltip(props) {
  function handleOverClickClose(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      props.onClose();
    }
  }
  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose}>
      <article
        onClick={handleOverClickClose}
        className={`popup registerInfo ${props.isOpen ? "popup_opened" : ""}`}
        aria-label="Попап"
      >
        <div className="popup__container registerInfo__container">
          <img
            className="registerInfo__img"
            src={props.isRegisterComplete ? completeRegister : errorRegister}
            alt="Состояние регистрации"
          ></img>
          <h2 className={`registerInfo__title`}>
            {props.isRegisterComplete
              ? `Вы успешно зарегистрировались!`
              : `Что-то пошло не так!
Попробуйте ещё раз.`}
          </h2>

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
export default InfoTooltip;
