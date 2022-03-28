import React from "react";

function Popup(props) {
  React.useEffect(() => {
    if (props.isOpen) {
      const closeByEscape = (e) => {
        if (e.key === "Escape") {
          props.onClose();
        }
      };
      document.addEventListener("keydown", closeByEscape);
      return () => document.removeEventListener("keydown", closeByEscape);
    }
  }, [props]);
  function handleOverClickClose(evt) {
    if (evt.target.classList.contains("popup_opened")) {
      props.onClose();
    }
  }
  return <div onClick={handleOverClickClose}>{props.children}</div>;
}

export default Popup;
