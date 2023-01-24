import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className='navigation'>
            <img src="./images/Logo-02.png" alt="Logo Yubin"  className='navigation-logo'/>
            <div className="navigation-container">
                <ul className='navigation-list'>
                    <NavLink to="/news-feed" className={(nav) => (nav.isActive ? "nav-active navigation-items" : "navigation-items")}>
                        <li>Accueil</li>
                    </NavLink>
                    <NavLink to="/profil" className={(nav) => (nav.isActive ? "nav-active navigation-items" : "navigation-items")}>
                        <li>Profil</li>
                    </NavLink>
                    <NavLink to="/connexion" className={(nav) => (nav.isActive ? "nav-active navigation-items" : "navigation-items")}>
                        <li>Déconnection</li>
                    </NavLink>
                </ul>
            </div>
        </div>
    );
};

export default Navigation;