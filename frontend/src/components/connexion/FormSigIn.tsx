import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import {NavLink, useNavigate} from 'react-router-dom';
import axios from 'axios';

const FormSigIn = () => {

    const errorDisplay = document.getElementById('error');
    console.log(errorDisplay);
    

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    interface DataUser {
        user_email:string,
        user_password:string,
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        let user:DataUser = {
            user_email: email,
            user_password: password,
        };
    
        await axios({
            method: "POST",
            url: "http://localhost:5000/api/auth/signin",
            data: user,
        })
        .then(() => navigate('/news-feed'))
        .catch(err => {
            console.log(err);
            errorDisplay?.classList.remove('visibility');    
        })
    };

    const handleCheck = () => {
        errorDisplay?.classList.add('visibility');
    }

    

    return (
        <div className='auth-container signin'>
            <div className="container-flex">
                <h1>Connection</h1>

                <form className="form-container" onSubmit={(e:any) => handleSubmit(e)}>
         
                    <div  className="input-container-connect">
                        <FontAwesomeIcon icon={faEnvelope}  className="icon-connect"/>
                        <input type="email" placeholder='Votre mail' className='form-container__input' onChange={(e:any) => setEmail(e.target.value)} required/>
                    </div>

                    <div className="input-container-connect">
                        <FontAwesomeIcon icon={faLock}  className="icon-connect"/>
                        <input type="password" placeholder='Votre mot de passe' className='form-container__input' onChange={(e:any) => setPassword(e.target.value)} required/>
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

            <div className='error visibility' id='error'>
                <div className="error__container">
                    <h2 className='error__container__title'>Mail ou Mot de passe incorrect</   h2>
                    <button className='error__container__btn' onClick={() => handleCheck()}>Validé</button>
                </div> 
            </div>
            
        </div>
    );
};

export default FormSigIn;