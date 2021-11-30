import React , {useState} from "react";

import Header from "../components/layOut/Header";
import Meals from "../components/Meals/Meals";
import Cart from "../components/Cart/Cart";
import CartProvider from "../store/CartProvider";


const App = () => {

    const [cartIsShown,setCartIsShown] = useState(false);
    const closeCart = (e) => {
        setCartIsShown(e)
    }
    const openCart = (e) => {
        setCartIsShown(e)
    }

    return (
        <CartProvider>
            {cartIsShown && <Cart onCloseCart={closeCart}/>}
            <Header onOpenCart={openCart}/>
            <main>
                <Meals />
            </main>
        </CartProvider>
    )
}

export default App;