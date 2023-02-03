import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

const AddFeed = () => {
  return (
    <div className="addFeed-container">
      <form className="addFeed-form-container">
        <div className="addFeed-top-input">
          <img src="./images/mee.png" alt="Avatar" className="avatar" />
          <input
            type="text"
            name=""
            id=""
            placeholder="Nouveau message ..."
            className="addFeed-input"
          />
        </div>
        <div className="addFeed-input-container">
          <input type="file" id="input-file" className="addFeed-file" />
          <label htmlFor="input-file" className="addFeed-file-icon">
            <FontAwesomeIcon icon={faFile} />
          </label>
          <input
            type="submit"
            value="Envoyé"
            className="addFeed-submit"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default AddFeed;
