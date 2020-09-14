import React, { Component } from 'react';
import Modal from '../../UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentDidMount() {
            axios.interceptors.response.use((res) => {
                this.setState({error: null});
                return res;
            }, error => {
                this.setState({error})
            });
        }

        messageConfirmed = () => {
            this.setState({error: null});
        }

        render() {
            return (
                <>
                    {
                        this.state.error
                        ?
                            <Modal
                                show={!!this.state.error}
                                hide={this.messageConfirmed}>
                                    {this.state.error.message}
                            </Modal>
                        :
                            null
                    }
                    <WrappedComponent {...this.props} />
                </>
            );
        }
    }
}

export default withErrorHandler;
