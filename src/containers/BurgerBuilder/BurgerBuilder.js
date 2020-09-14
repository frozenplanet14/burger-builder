import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios.orders';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {},
        totalPrice: 4,
        purchasing: false,
        isLoading: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(({data}) => {
                this.setState({ingredients: data});
            });
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

    purchaseContinueHandler = () => {
        // this.setState({isLoading: true});
        // const {ingredients, totalPrice: price} = this.state;
        // axios.post('/orders.json', {
        //     ingredients,
        //     price,
        //     customer: {
        //         name: 'Suman Jha',
        //         address: {
        //             street: 'Test street 1',
        //             zipCode: '43281',
        //             country: 'USA'
        //         },
        //         email: 'test@test.com',
        //     },
        //     deliveryMethod: 'fastest'
        // })
        // .then(response => {
        //     console.log(response);
        //     this.setState({isLoading: false, purchasing: false});
        // })
        // .catch(error => console.log(error));
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + Object.keys(this.state.ingredients)
                .reduce((cumm, curr) => [...cumm, curr + '=' + this.state.ingredients[curr]], []).join('&')
          });
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
                {
                    this.state.isLoading
                        ? <Spinner />
                        : <OrderSummary
                            ingredients={this.state.ingredients}
                            totalPrice={this.state.totalPrice}
                            isLoading={this.state.isLoading}
                            hide={() => this.purchaseHandler(false)}
                            continue={this.purchaseContinueHandler}/>
                }
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

export default withErrorHandler(BurgerBuilder, axios);
