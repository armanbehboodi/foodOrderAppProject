import React,{useRef,useState} from "react";

import useInputs from "../../hooks/use-inputs";
import styles from './CheckOut.module.css';

const CheckOut = (props) => {

    const cancelOrderHandler = () => {
        props.onCancelOrder(false)
    }

    const nameRef = useRef('');
    const numberRef = useRef(null);
    const addressRef = useRef('');
    const postalCodeRef = useRef('');

    const [successfulFetch,setSuccessfulFetch] = useState(false);

    const SubmitHandler = (e) => {
        e.preventDefault();
        const userData = {
            name: nameRef.current.value,
            phoneNumber: numberRef.current.value,
            address: addressRef.current.value,
            postalCode: postalCodeRef.current.value
        }
        setSuccessfulFetch(true);
        props.onSubmit(userData);

        nameReset();
        numberReset();
        addressReset();
        postalReset();
    }


    const {
        value: nameInputValue,
        isValid: nameDataIsValid,
        error: nameErrorHappened,
        inputChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: nameReset
    } = useInputs((value) => value.trim().length >=3);

    const {
        value: numberInputValue,
        isValid: numberDataIsValid,
        error: numberErrorHappened,
        inputChangeHandler: numberChangeHandler,
        inputBlurHandler: numberBlurHandler,
        reset: numberReset
    } = useInputs((value) => value.trim().length === 11);

    const {
        value: addressInputValue,
        isValid: addressDataIsValid,
        error: addressErrorHappened,
        inputChangeHandler: addressChangeHandler,
        inputBlurHandler: addressBlurHandler,
        reset: addressReset
    } = useInputs((value) => value.trim().length >= 10);

    const {
        value: postalInputValue,
        isValid: postalDataIsValid,
        error: postalErrorHappened,
        inputChangeHandler: postalChangeHandler,
        inputBlurHandler: postalBlurHandler,
        reset: postalReset
    } = useInputs((value) => value.trim().length >= 10);


    if (successfulFetch){
        return (
            <p className={styles.successPara}>Your Order Received Successfully!</p>
        )
    }
    else {
        return (
            <form onSubmit={SubmitHandler} className={styles.formBox}>
                <div className={styles.mainBox}>
                    <label className={styles.labels} htmlFor='userName'>Your Name</label>
                    <input className={`${styles.inputs} ${nameErrorHappened && styles.error}`} type='text' id='userName'
                           value={nameInputValue} onChange={nameChangeHandler} onBlur={nameBlurHandler} ref={nameRef}/>
                </div>
                {nameErrorHappened &&
                <p className={styles.errorPara}>Name input have to contain at least 3 characters</p>}
                <div className={styles.mainBox}>
                    <label className={styles.labels} htmlFor='phoneNumber'>Your Phone Number</label>
                    <input className={`${styles.inputs} ${numberErrorHappened && styles.error}`} type='number'
                           id='phoneNumber' value={numberInputValue} onChange={numberChangeHandler}
                           onBlur={numberBlurHandler} ref={numberRef}/>
                </div>
                {numberErrorHappened && <p className={styles.errorPara}>Number Input Have To Contain 11 Characters</p>}
                <div className={styles.mainBox}>
                    <label className={styles.labels} htmlFor='address'>Your Address</label>
                    <input className={`${styles.inputs} ${addressErrorHappened && styles.error}`} type='text'
                           id='address' value={addressInputValue} onChange={addressChangeHandler}
                           onBlur={addressBlurHandler} ref={addressRef}/>
                </div>
                {addressErrorHappened &&
                <p className={styles.errorPara}>Address Input Have To Contain At Least 10 Characters</p>}
                <div className={styles.mainBox}>
                    <label className={styles.labels} htmlFor='postalCode'>Your PostalCode</label>
                    <input className={`${styles.inputs} ${postalErrorHappened && styles.error}`} type='text'
                           id='postalCode' value={postalInputValue} onChange={postalChangeHandler}
                           onBlur={postalBlurHandler} ref={postalCodeRef}/>
                </div>
                {postalErrorHappened &&
                <p className={styles.errorPara}>Postal Code Input Have To Contain At Least 10 Characters</p>}
                <button type='submit' className={`${styles.buttons} ${styles.confirm}`}
                        disabled={!nameDataIsValid || !numberDataIsValid || !addressDataIsValid || !postalDataIsValid}>Confirm
                </button>
                <button type='button' className={`${styles.buttons} ${styles.cancel}`}
                        onClick={cancelOrderHandler}>Cancel
                </button>
            </form>
        )
    }
}

export default CheckOut;