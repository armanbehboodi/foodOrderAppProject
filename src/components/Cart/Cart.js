import React , {useContext,useState} from "react";

import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";
import styles from './Cart.module.css';

const Cart = (props) => {

    const [checkOut,setCheckOut] = useState(false)
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItem = cartCtx.items.length > 0;
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item,amount:1});
    };

    const cartItems = <ul className={styles['cart-items']}>{cartCtx.items.map(item => <CartItem name={item.name} price={item.price} key={item.id} amount={item.amount} onRemove={cartItemRemoveHandler.bind(null,item.id)} onAdd={cartItemAddHandler.bind(null,item)}/>)}</ul>
    const closeCartHandler = () => {
        props.onCloseCart(false)
    }
    const checkOutHandler = () => {
        setCheckOut(true);
    }
    const cancelOrder = (e) => {
        setCheckOut(e);
    }

    const submitHandler = (userData) => {
        fetch('https://food-order-app-6158b-default-rtdb.firebaseio.com/userData.json',{
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
        cartCtx.clearCart();
    }

    return (
        <Modal>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={closeCartHandler}>Close</button>
                {hasItem && <button className={styles.button} onClick={checkOutHandler}>Order</button>}
            </div>
            {checkOut && <CheckOut onSubmit={submitHandler} onCancelOrder={cancelOrder} />}
        </Modal>
    )
}

export default Cart;