import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "../index.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import { api, apiAuth } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLogin, setIsLogin] = React.useState(false);
  const [isInfoTooltipOpen,setIsInfoTooltipOpen]=React.useState(false)
  const [isRegisterComplete,setIsRegisterComplete]=React.useState(false)

  React.useEffect(() => {
    api
      .getProfile()
      .then((profileInfo) => {
        setCurrentUser(profileInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardClick({ link, name }) {
    setSelectedCard({ link, name });
    setIsImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false)
  }

  function handleUpdateUser({ name, about }) {
    api
      .patchEditProfile(name, about)
      .then((profileInfo) => setCurrentUser(profileInfo))
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .patchAvatar(avatar)
      .then((profileInfo) => setCurrentUser(profileInfo))
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }

  const [cards, setCards] = React.useState([]);

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((stateCard) => stateCard._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((stateCard) =>
            stateCard._id === card._id ? newCard : stateCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleAddPlaceSubmit({ newCardTitle, newCardLink }) {
    api
      .postAddCard(newCardTitle, newCardLink)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => {
        console.log(err);
      });
    closeAllPopups();
  }
  React.useEffect(() => {
    apiAuth
      .checkJWT(localStorage.getItem("jwt"))
      .then((data) => console.log(data));
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="page">
        <Header />
        <Switch>
          <Route path="/sign-up">
            <Register />
          </Route>
          <Route path="/sign-in">
            <Login />
          </Route>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={isLogin}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onImage={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
          ></ProtectedRoute>
          <Route>
            {isLogin ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />

      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        link={selectedCard.link}
        name={selectedCard.name}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isRegisterComplete={isRegisterComplete}
      ></InfoTooltip>
    </CurrentUserContext.Provider>
  );
}


export default App;
