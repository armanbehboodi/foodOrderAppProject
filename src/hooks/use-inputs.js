import {useState} from "react";

const useInputs = (validateFunction) => {
   const [inputValue,setInputValue] = useState('');
   const [errorHappened,setErrorHappened] = useState(false);

   const dataIsValid = validateFunction(inputValue);

   const inputChangeHandler = (e) => {
       setInputValue(e.target.value)
       setErrorHappened(false);
   }
   const inputBlurHandler = () => {
       validateFunction(inputValue);
       setErrorHappened(!dataIsValid);
   }
   const reset = () => {
       setInputValue('');
   }

   return {
       value: inputValue,
       isValid: dataIsValid,
       error: errorHappened,
       inputChangeHandler,
       inputBlurHandler,
       reset
   }
}

export default useInputs;