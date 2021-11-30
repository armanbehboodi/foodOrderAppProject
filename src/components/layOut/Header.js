import React , {Fragment} from 'react';

import styles from './Header.module.css';
import logo from '../../assets/logo.png'
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    const openCart = (e) => {
        props.onOpenCart(e)
    }
    return (
        <Fragment>
            <header className={styles.header}>
                <img className={styles.logo} src={logo} alt='logo' />
                <h1>FoodOrderApp</h1>
                <HeaderCartButton onOpenCart={openCart}/>
            </header>
            <div className={styles['main-BG']}>
                <div className={styles['top-BG']}> </div>
            </div>
        </Fragment>
    )
}

export default Header;