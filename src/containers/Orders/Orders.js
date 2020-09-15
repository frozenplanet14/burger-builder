import React, { Component } from 'react';
import axios from '../../axios.orders';
import Order from '../../components/Order/order';
import withErrorHandler from '../../components/hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        this.setState({loading: true});
        axios.get('/orders.json')
            .then(({data}) => {
                const orders = Object.keys(data)
                    .reduce((cumm, k) => [...cumm, {...data[k], id: k}], []);
                this.setState({loading: false, orders});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render() {
        return (
            <div>
                {
                    this.state.orders.map(order => (
                        <Order key={order.id} order={order} />
                    ))
                }
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);
