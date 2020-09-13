import React from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = ({children}) => (
    <React.Fragment>
        <Toolbar />
        <SideDrawer />
        {/* <div>Toolbar, SideDrawer, Backdrop</div> */}
        <main className={classes.Content}>
            {children}
        </main>
    </React.Fragment>
);

export default layout;
