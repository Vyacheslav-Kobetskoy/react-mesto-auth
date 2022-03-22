import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [newCardTitle, setNewCardTitle] = React.useState("");
  const [newCardLink, setNewCardLink] = React.useState("");

  React.useEffect(() => {
    setNewCardTitle("");
    setNewCardLink("");
  }, [props.isOpen]);

  function handleChangeNewCardTitle(event) {
    setNewCardTitle(event.target.value);
  }

  function handleChangeNewCardLink(event) {
    setNewCardLink(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({ newCardTitle, newCardLink });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverClickClose={props.onOverClickClose}
      onSubmit={handleSubmit}
      name={"add-img"}
      title={"Новое место"}
      buttonText={"Создать"}
    >
      <div className="popup__input-container">
        <input
          id="TitleImg"
          className="popup__input-text popup__input-text_type_title-img"
          name="TitleImg"
          type="text"
          value={newCardTitle || ""}
          onChange={handleChangeNewCardTitle}
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span id="TitleImg-error" className="popup__input-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          id="linkImg"
          className="popup__input-text popup__input-text_type_link-img"
          name="linkImg"
          type="url"
          value={newCardLink || ""}
          onChange={handleChangeNewCardLink}
          placeholder="Ссылка на картинку"
          required
        />
        <span id="linkImg-error" className="popup__input-error"></span>
      </div>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
