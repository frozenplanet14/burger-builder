import React, { Component } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        sideDrawerOpen: false
    }

    toggleSidebar = (show) => {
        this.setState({sideDrawerOpen: show});
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar clicked={() => this.toggleSidebar(true)} />
                <SideDrawer show={this.state.sideDrawerOpen} hide={() => this.toggleSidebar(false)}  />
                {/* <div>Toolbar, SideDrawer, Backdrop</div> */}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

export default Layout;
