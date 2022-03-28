import React from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import apiAuth from "../utils/ApiAuth.js";
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
  const [cards, setCards] = React.useState([]);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLogin, setIsLogin] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegisterComplete, setIsRegisterComplete] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();

  React.useEffect(() => {
    if (isLogin) {
      api
        .getProfile()
        .then((profileInfo) => {
          setCurrentUser(profileInfo);
        })
        .catch((err) => {
          console.log(err);
        });
      api
        .getInitialCards()
        .then((initialCards) => {
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLogin]);

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
    setIsInfoTooltipOpen(false);
  }

  function handleUpdateUser({ name, about }) {
    api
      .patchEditProfile(name, about)
      .then((profileInfo) => {
        setCurrentUser(profileInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .patchAvatar(avatar)
      .then((profileInfo) => {
        setCurrentUser(profileInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

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

  function handleAddPlaceSubmit({ newCardTitle, newCardLink }) {
    api
      .postAddCard(newCardTitle, newCardLink)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => tokenCheck(), []);

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      apiAuth
        .checkJWT(localStorage.getItem("jwt"))
        .then((data) => {
          if (data) {
            setIsLogin(true);
            setEmail(data.data.email);
            history.push("/main");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleRegister(password, email) {
    apiAuth
      .registerUser(password, email)
      .then((data) => {
        console.log(data);
        if (data) {
          history.push("/sign-in");
          setIsRegisterComplete(true);
        }
      })
      .catch((err) => {
        setIsRegisterComplete(false);
        console.log(err);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLogin(password, email) {
    apiAuth
      .loginUser(password, email)
      .then((data) => {
        if (data) {
          localStorage.setItem("jwt", data.token);
          tokenCheck();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleReLogin() {
    localStorage.clear();
    setIsLogin(false);
  }
  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="page">
        <Header email={email} handleReLogin={handleReLogin} />
        <Switch>
          <ProtectedRoute
            exact
            path="/main"
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
          <Route path="/sign-up">
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route>{!isLogin && <Redirect to="/sign-in" />}</Route>
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
