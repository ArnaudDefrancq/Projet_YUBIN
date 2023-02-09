import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const AddCom = () => {
  return (
    <div className="add-com">
      <img src="./images/mee.png" alt="avatar" className="add-com-image" />
      <form className="add-com-form">
        <input
          type="text"
          placeholder="Ecrivez un commentaire ..."
          className="add-com-input"
        />
        <button type="submit" className="add-com-submit">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
};

export default AddCom;
