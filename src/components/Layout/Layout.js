import React from 'react';
import classes from './Layout.module.css';

const layout = ({children}) => (
    <React.Fragment>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>
            {children}
        </main>
    </React.Fragment>
);

export default layout;
