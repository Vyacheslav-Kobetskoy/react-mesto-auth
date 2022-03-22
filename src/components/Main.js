import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import Card from "./Card.js";

function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile" aria-label="Профиль">
        <div className="profile__docket">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <button
            onClick={props.onEditAvatar}
            className="profile__avatar-btn btn-hover"
          ></button>
          <div className="profile__info">
            <div className="profile__title">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={props.onEditProfile}
                className="profile__edit-btn btn-hover"
                type="button"
              ></button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add-btn btn-hover"
          type="button"
        ></button>
      </section>

      <section className="gallery" aria-label="Галерея">
        {props.cards.map((card) => {
          return (
            <div className="template" key={card._id}>
              <Card
                card={card}
                onImage={props.onImage}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Main;
