import React, {useContext, useEffect, useState} from "react";

import styles from './HeaderCartButton.module.css';
import cartLogo from '../../assets/cartLogo.png';
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
    const openCartHandler = () => {
        props.onOpenCart(true)
    }
    const CartCtx = useContext(CartContext);
    const numberOfCartItems = CartCtx.items.reduce((curNum,item) => {
        return curNum + item.amount;
    },0)

    const [btnBump,setBtnBump] = useState(false);

    const btnClasses = `${styles['cart-button']} ${btnBump ? styles.bump : ''}`;

    const {items} = CartCtx;
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnBump(true);
        const timer = setTimeout(() => {
            setBtnBump(false);
        },300)

        return () => {
            clearTimeout(timer);
        }
    },[items]);

    return (
        <button className={btnClasses} onClick={openCartHandler}>
            <img className={styles['cart-logo']} src={cartLogo} alt='cartLogo'/>
            <span>Your Cart</span>
            <span className={styles['cart-span']}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;