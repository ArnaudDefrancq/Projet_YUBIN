import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FormContent = () => {


    const PSEUDO_REGEX = /^[a-zA-Z0-9\s]{3,40}$/;
    const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const PASSWORD_REGEX =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const errorPseudo= document.getElementById('pseudoError');
    const errorEmail = document.getElementById('emailError');
    const errorPassword = document.getElementById('passwordError');

    const [pseudo, setPseudo] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    interface DataUser {
        user_pseudo:string,
        user_email:string,
        user_password:string
    };


    const checkPseudo = (pseudo:string) => {
        if (PSEUDO_REGEX.test(pseudo)) {
            errorPseudo!.textContent = "";
            return true;
            
        } else {
            errorPseudo!.textContent = "Votre pseudo doit faire plus de 3 caractères !";
            return false;
        };

    };

    const checkEmail = (email:string) => {
        if (EMAIL_REGEX.test(email)) {
            errorEmail!.textContent = "";
            return true;
            
        } else {
            errorEmail!.textContent = "Email invalide !";
            return false;
        };

    };

    const checkPassword = (password:string) => {
        if (PASSWORD_REGEX.test(password)) {
            errorPassword!.textContent = "";
            return true;
            
        } else {
            errorPassword!.textContent = "Votre mot de passe doit contenir: majuscule, minucule, chiffre, caractère spéciale et mininum 8 caractères !";
            return false;
        };

    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (checkPseudo(pseudo) && checkEmail(email) && checkPassword(password)) {
            let user:DataUser = {
                user_pseudo: pseudo,
                user_email: email,
                user_password: password,
            };

            await axios({
                method: "POST",
                url: "http://localhost:5000/api/auth/signup",
                data: user,
            })
            .then(() => navigate('/connexion'))
            .catch(err => console.log(err))
            
        }
    };


    return (
        <div className='auth-container'>
            <div className="container-flex">
                <h1>Inscription </h1>

                <form className="form-container" onSubmit={(e:any) => handleSubmit(e)}>

                    <div>
                        <div className="input-container-connect">
                            <FontAwesomeIcon icon={faUser}  className="icon-connect"/>
                            <input type="text" placeholder='Votre pseudo' className='form-container__input' onChange={(e:any) => setPseudo(e.target.value)} required/>
                        </div>
                        <p className='error-msg' id='pseudoError'></p>
                    </div>

                    <div>
                        <div className="input-container-connect">
                            <FontAwesomeIcon icon={faEnvelope}  className="icon-connect"/>
                            <input type="email" placeholder='Votre mail' className='form-container__input' onChange={(e:any) => setEmail(e.target.value)}  required/>
                        </div>
                        <p className='error-msg' id='emailError'></p>
                    </div>

                    <div>
                        <div className="input-container-connect">
                            <FontAwesomeIcon icon={faLock}  className="icon-connect"/>
                            <input type="password" placeholder='Votre mot de passe' className='form-container__input' onChange={(e:any) => setPassword(e.target.value)} required/>
                        </div>
                        <p className='error-msg' id='passwordError'></p>
                    </div>


                    <button type="submit" value="Inscription" className='form-container__button'>Inscription</button>
                </form>
                
            </div>
            <div className='image-container'>
                <img src="./images/image_signup.webp" alt="Bureau d'ordinateur" className='image-connect'/>
                <NavLink to="/connexion">
                    <p className='signin-signup'>Déja un compte ? Connectez-vous !</p>
                </NavLink>
            </div>
            
        </div>
    );
};

export default FormContent;