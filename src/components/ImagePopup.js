import Popup from "./Popup";

function ImagePopup(props) {
  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose}>
      <article
        onClick={props.onOverClickClose}
        className={`popup zoom ${props.isOpen && "popup_opened"}`}
        aria-label="Попап"
      >
        <div className="zoom__container">
          <img className="zoom__img" src={props.link} alt={props.name} />
          <h2 className="zoom__title">{props.name}</h2>
          <button
            onClick={props.onClose}
            className="popup__close-btn btn-hover popup__close-zoom"
            type="button"
          ></button>
        </div>
      </article>
    </Popup>
  );
}

export default ImagePopup;
