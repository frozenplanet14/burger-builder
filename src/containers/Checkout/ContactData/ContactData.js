import React, {  Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios.orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../components/hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../../store/actions/order';

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }
                    ]
                },
                value: 'fastest'
            }
        }
    }

    orderHandler = (evt) => {
        evt.preventDefault();
        const {ingredients, price} = this.props;
        this.props.submitOrder({
            ingredients,
            price,
            customer: Object.keys(this.state.orderForm).reduce(
                (form, el) => ({...form, [el]: this.state.orderForm[el].value}), {} 
            )
        });
    }

    inputChangeHandler = (name, value) => {
        // console.log(name, value);
        this.setState((prev) => {
            const updatedOrderForm = {
                ...prev.orderForm
            }
            updatedOrderForm[name] = {
                ...updatedOrderForm[name],
                value
            }
            return {orderForm: updatedOrderForm};
        });
    }

    render() {
        let form = <Spinner />
        if (!this.props.isLoading) {
            form = (
                <form onSubmit={this.orderHandler}>
                    {
                        Object.keys(this.state.orderForm).map(name => (
                            <Input key={name} name="name"
                                value={this.state.orderForm[name].value}
                                elementConfig={this.state.orderForm[name].elementConfig}
                                elementType={this.state.orderForm[name].elementType}
                                changed={(evt) => this.inputChangeHandler(name, evt.target.value)}/>
                        ))
                    }
                    <Button type="Success">ORDER</Button>
                </form>
            );
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.totalPrice,
        isLoading: state.order.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitOrder: (orderData) => dispatch(actionTypes.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
