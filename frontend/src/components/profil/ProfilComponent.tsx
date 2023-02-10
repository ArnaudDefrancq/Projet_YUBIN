import React from "react";

const ProfilComponent = () => {
  return (
    <div className="profil">
      <img src="./images/mee.png" alt="avatar" className="profil-image" />
      <div className="profil-container">
        <input
          type="text"
          placeholder="Pseudo"
          className="profil-container-input"
        />
        <input
          type="text"
          placeholder="Adresse email"
          className="profil-container-input"
        />
      </div>
      <p className="number-publication">Nombre de publication : 20</p>
    </div>
  );
};

export default ProfilComponent;
