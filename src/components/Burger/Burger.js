import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { IngredientConst } from './BurgerIngredient/Ingredient.const';

const burger = (props) => {
    let ingredients = Object.keys(props.ingredients).map(k => {
        return [...Array(props.ingredients[k])].map((_, i) => (
            <BurgerIngredient key={k + i} type={k} />
        ))
    }).reduce((cumm, curr) => [...cumm, ...curr], []);
    if (ingredients.length === 0) {
        ingredients = <p>Please start adding ingredients!</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={IngredientConst.BREAD_TOP} />
            { ingredients }
            <BurgerIngredient type={IngredientConst.BREAD_BOTTOM} />
        </div>
    );
}

export default burger;
