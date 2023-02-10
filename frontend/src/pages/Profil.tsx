import React from "react";
import Navigation from "../components/Navigation";
import ProfilComponent from "../components/profil/ProfilComponent";

const Profil = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <ProfilComponent />
      </main>
    </>
  );
};

export default Profil;
