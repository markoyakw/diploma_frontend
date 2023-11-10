import React from 'react';
import classes from "../../styles/loader.module.css"

const Loader = () => {
    return (
        <div className={classes.loader_container}>
            <div className={classes.loader}></div>
        </div>
    );
};

export default Loader;