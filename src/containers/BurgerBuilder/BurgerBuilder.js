import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasing: false
    }

    addIngredientHandler = (type) => {
        const ingredients = {
            ...this.state.ingredients,
            [type]: this.state.ingredients[type] + 1
        };
        const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients, totalPrice});
    }

    removeIngredientHandler = (type) => {
        const count = this.state.ingredients[type] - 1;
        if (count < 0) {
            return;
        }
        const ingredients = {
            ...this.state.ingredients,
            [type]: count
        };
        const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients, totalPrice});
    }

    purchaseHandler = (show) => {
        this.setState({purchasing: show})
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        const purchaseable = Object.values(disabledInfo).reduce((t, c) => t + c, 0) > 0;
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return (
            <>
                <Modal show={this.state.purchasing} hide={() => this.purchaseHandler(false)}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice}
                        hide={() => this.purchaseHandler(false)}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    price={this.state.totalPrice}
                    purchaseable={purchaseable}
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabledInfo={disabledInfo}
                    orderNow={() => this.purchaseHandler(true)}/>
            </>
        );
    }
}

export default BurgerBuilder;
