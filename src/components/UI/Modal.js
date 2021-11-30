import React , {Fragment} from "react";
import ReactDOM from 'react-dom';

import styles from './Modal.module.css';


const ModalOverLay = (props) => {
    return (
        <div className={styles.backdrop}>
            <div className={styles.modal}>
                <div>{props.children}</div>
            </div>
        </div>
    )
}

const Modal = (props) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay>,document.getElementById('ModalOverLay--root'))}
        </Fragment>
    )
}

export default Modal;