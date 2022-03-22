import React, { useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const { currentUser } = useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverClickClose={props.onOverClickClose}
      onSubmit={handleSubmit}
      name={"edit"}
      title={"Редактировать профиль"}
      buttonText={"Сохранить"}
    >
      <div className="popup__input-container">
        <input
          id="editName"
          className="popup__input-text popup__input-text_type_name"
          name="editName"
          type="text"
          value={name || ""}
          onChange={handleChangeName}
          minLength="2"
          maxLength="40"
          required
        />
        <span id="editName-error" className="popup__input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          id="editAbout"
          className="popup__input-text popup__input-text_type_about"
          name="editAbout"
          type="text"
          value={description || ""}
          onChange={handleChangeDescription}
          minLength="2"
          maxLength="200"
          required
        />
        <span id="editAbout-error" className="popup__input-error"></span>
      </div>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
