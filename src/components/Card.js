import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);

  function handleCardClick() {
    props.onImage({ link: props.card.link, name: props.card.name });
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="template">
      <div className="gallery__card">
        <img
          className="gallery__photo"
          onClick={handleCardClick}
          src={props.card.link}
          alt={props.card.name}
        />
        <div className="gallery__caption">
          <h2 className="gallery__photo-title">{props.card.name}</h2>
          <div className="gallery__like-container">
            <button
              className={`btn-hover gallery__like ${
                isLiked ? "gallery__like_active" : ""
              }`}
              onClick={handleLikeClick}
              type="button"
            ></button>
            <span className="gallery__like-counter">
              {props.card.likes.length}
            </span>
          </div>
        </div>
        <button
          className={`btn-hover gallery__delete-btn ${
            !isOwn && "gallery__delete-btn_hidden"
          }`}
          onClick={handleDeleteClick}
        ></button>
      </div>
    </div>
  );
}

export default Card;
