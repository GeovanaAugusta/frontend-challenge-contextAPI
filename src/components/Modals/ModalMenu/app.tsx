import '../../styles.css';
import CloseIcon from '../../../assets/icons/close.png';
import { ModalMenuI } from './interface';
import React from 'react';

const ModalMenu: React.FC<ModalMenuI> = ({ onToggleModal }) => {
    return (
        <>
            <div className="container-modal menu container-modal-menu">
                <div className="modal-container">
                    <button className="modal-close modal-close-menu" onClick={onToggleModal}>
                        <img src={CloseIcon} alt="Close Modal" />
                    </button>
                    <div className="modal-content">
                        <button className="modal-button">Entrar</button>
                        <hr className="modal-separator" />
                        <button className="modal-button">Contato</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalMenu;