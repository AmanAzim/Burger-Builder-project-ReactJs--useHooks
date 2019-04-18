import React, {useState} from 'react'
import Aux from '../../hoc/Auxiliary'
import CssClass from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

const Layout =(props)=>{

    const [sideDrawerIsVisible, setSideDrawerIsVisible]=useState(false);

    const sideDrawerClosedHandler=()=>{
        setSideDrawerIsVisible(false);
    };

    const sideDrawerToggleHandler=()=>{
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };


       return(
           <Aux>
               <Toolbar toggler={sideDrawerToggleHandler}
                        Authenticated={props.isAuthenticated}/>
               <SideDrawer open={sideDrawerIsVisible}
                           closed={sideDrawerClosedHandler}
                           Authenticated={props.isAuthenticated}/>
               <main className={CssClass.Content}>
                   {props.children}
               </main>
           </Aux>
       );
};

const mapStatetoProps=(state)=>{
  return{
      isAuthenticated:state.auth.token !== null
  }
};

export default connect(mapStatetoProps)(Layout);


