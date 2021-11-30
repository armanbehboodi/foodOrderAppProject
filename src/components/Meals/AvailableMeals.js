import {useEffect,useState} from "react";

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {

    const [meals,setMeals] = useState([]);
    const [errorText,setErrorText] = useState('');
    const [isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        fetch('https://food-order-app-6158b-default-rtdb.firebaseio.com/meals.json')
            .then((response) => {
                setErrorText('');
                if (!response.ok){
                    setIsLoading(false);
                    throw new Error('oops! some thing went wrong')
                }
                return response.json();
            })
            .then((data) => {
                setIsLoading(false);
                const dummyMeals = [];
                for (const key in data){
                    dummyMeals.push({
                        id: key,
                        name: data[key].name,
                        description: data[key].description,
                        price: data[key].price
                    })
                }
                setMeals(dummyMeals);
            })
            .catch((error) => {
                setErrorText(error.message);
            })
    },[])


    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    if (errorText === '' && isLoading === false){
        return (
            <section className={classes.meals}>
                <Card>
                    <ul>{mealsList}</ul>
                </Card>
            </section>
        );
    }else if (errorText !== '' && isLoading === false) {
        return <p className={classes.alertText}>{errorText}</p>
    } else if (isLoading === true){
        return <p className={classes.alertText}>Loading</p>
    }
};

export default AvailableMeals;