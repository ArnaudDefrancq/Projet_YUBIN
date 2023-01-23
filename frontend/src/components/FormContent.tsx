import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import {NavLink} from 'react-router-dom';

const FormContent = () => {

    return (
        <div className='auth-container'>
            <div className="container-flex">
                <h1>Inscription </h1>

                <form className="form-container">

                    <div className="input-container-connect">
                        <FontAwesomeIcon icon={faUser}  className="icon-connect"/>
                        <input type="text" placeholder='Votre pseudo' className='form-container__input' required/>
                    </div>

                    <div className="input-container-connect">
                        <FontAwesomeIcon icon={faEnvelope}  className="icon-connect"/>
                        <input type="email" placeholder='Votre mail' className='form-container__input' required/>
                    </div>

                    <div className="input-container-connect">
                        <FontAwesomeIcon icon={faLock}  className="icon-connect"/>
                        <input type="password" placeholder='Votre mot de passe' className='form-container__input' required/>
                    </div>


                    <button type="submit" value="Inscription" className='form-container__button'>Inscription</button>
                </form>
                
            </div>
            <div className='image-container'>
                <img src="./images/image_signup.webp" alt="Bureau d'ordinateur" className='image-connect'/>
                <NavLink to="/connexion">
                    <p className='signin'>Déja un compte ? Connectez-vous !</p>
                </NavLink>
            </div>
            
        </div>
    );
};

export default FormContent;