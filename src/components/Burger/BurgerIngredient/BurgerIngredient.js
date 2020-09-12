import React, { Component } from 'react';
import { IngredientConst } from './Ingredient.const';
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;
    
        switch (this.props.type) {
            case IngredientConst.BREAD_BOTTOM:
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case IngredientConst.BREAD_TOP:
                ingredient = (
                    <div className={classes.BreadTop}>
                        <div className={classes.Seeds1}></div>
                        <div className={classes.Seeds2}></div>
                    </div>
                );
                break;
            case IngredientConst.MEAT:
                ingredient = <div className={classes.Meat}></div>;
                break;
            case IngredientConst.CHEESE:
                ingredient = <div className={classes.Cheese}></div>;
                break;
            case IngredientConst.SALAD:
                ingredient = <div className={classes.Salad}></div>;
                break;
            case IngredientConst.BACON:
                ingredient = <div className={classes.Bacon}></div>;
                break;
            default:
                break;
        }
        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;
