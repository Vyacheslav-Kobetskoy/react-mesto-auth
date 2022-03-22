import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputAvatarRef = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputAvatarRef.current.value,
    });
  }

  React.useEffect(() => {
    inputAvatarRef.current.value = "";
  }, [props.isOpen, inputAvatarRef]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverClickClose={props.onOverClickClose}
      onSubmit={handleSubmit}
      name={"edit-avatar"}
      title={"Обновить аватар"}
      buttonText={"Сохранить"}
    >
      <div className="popup__input-container">
        <input
          id="linkAvatar"
          className="popup__input-text popup__input-text_type_link-Avatar"
          name="linkAvatar"
          type="url"
          placeholder="Ссылка на аватар"
          ref={inputAvatarRef}
          required
        />
        <span id="linkAvatar-error" className="popup__input-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
