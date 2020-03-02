import React, { Component } from 'react';

import Navigation from './index';
import SideDrawer from "./SideDrawer";
import Backdrop from "../Backdrop/backdrop";

class  NavigationComponent extends Component {
    state = {
        sideDrawerOpen: false
    };

    drawerToggleClickHandler = () => {
        this.setState((prevstate) => {
            return {sideDrawerOpen: !prevstate.sideDrawerOpen}
        });
    };

    handleBackdropClick = () => {
        this.setState({sideDrawerOpen: false})
    };

    render(){
        let backdrop;
        if(this.state.sideDrawerOpen){
            backdrop = <Backdrop click={this.handleBackdropClick}/>
        }
        return (
        <>

            <Navigation drawerClickHandler={this.drawerToggleClickHandler}/>
            <SideDrawer show={this.state.sideDrawerOpen}/>
            {backdrop}
        </>
        )
    }
}

export default NavigationComponent;