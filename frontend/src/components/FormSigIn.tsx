import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import {NavLink} from 'react-router-dom';

const FormSigIn = () => {
    return (
        <div className='auth-container signin'>
            <div className="container-flex">
                <h1>Connection</h1>

                <form className="form-container">


                    <div className="input-container-connect">
                        <FontAwesomeIcon icon={faEnvelope}  className="icon-connect"/>
                        <input type="email" placeholder='Votre mail' className='form-container__input' required/>
                    </div>

                    <div className="input-container-connect">
                        <FontAwesomeIcon icon={faLock}  className="icon-connect"/>
                        <input type="password" placeholder='Votre mot de passe' className='form-container__input' required/>
                    </div>


                    <button type="submit" value="Connection" className='form-container__button'>Connection</button>
                </form>
                
            </div>
            <div className='image-container'>
                <img src="./images/image_signin.webp" alt="Bureau d'ordinateur" className='image-connect'/>
                <NavLink to="/">
                    <p className='signin-signup'>Vous n'avez pas de compte ? Inscrivez-vous !</p>
                </NavLink>
            </div>
            
        </div>
    );
};

export default FormSigIn;