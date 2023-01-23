import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faHouse } from '@fortawesome/free-solid-svg-icons';
import {NavLink} from 'react-router-dom';

const MessageError = () => {
    return (
        <div className='error-container'>
            <h1>Page Introuvable</h1>
            <NavLink to={'/connexion'}>
                <p>Retouner à la page de connection <FontAwesomeIcon icon={faHouse} /></p>
            </NavLink>
        </div>
    );
};

export default MessageError;