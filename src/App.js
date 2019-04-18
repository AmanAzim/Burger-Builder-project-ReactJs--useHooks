import React, { useState, useEffect, Suspense } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as Actions from './store/actions/exportAllActions'

import Layout from './containers/Layout/Layout'
import BurgerBuilder from  './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
//import Checkout from './containers/Checkout/Checkout'
//import Orders from './containers/Orders/Orders'
//import Auth from './containers/Auth/Auth'
const Orders = React.lazy(()=> import('./containers/Orders/Orders'));
const Auth = React.lazy(()=> import('./containers/Auth/Auth'));
const Checkout = React.lazy(()=> import('./containers/Checkout/Checkout'));

//render={()=> <Suspense fallback={<div>Loading</div>}> <Auth/> </Suspense>}

const App =(props)=> {


  useEffect(()=>{
      props.onTryAutoSignIn();
  }, []);

    let routes=(
        <Switch>
            <Route path="/auth" render={()=> <Suspense fallback={<div>Loading</div>}> <Auth/> </Suspense>} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
    );

    if(props.isAuthenticated){
        routes=(
            <Switch>
                <Route path="/checkout" render={()=> <Suspense fallback={<div>Loading</div>}> <Checkout {...this.props}/> </Suspense>}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/orders" render={()=> <Suspense fallback={<div>Loading</div>}> <Orders /> </Suspense>} />
                <Route path="/auth" render={()=> <Suspense fallback={<div>Loading</div>}> <Auth/> </Suspense>} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
            </Switch>
        );
    }
    return (
      <div >
        <Layout>
            {routes}
        </Layout>
      </div>
    );

}

const mapStateToProps=state=>{
    return {
        isAuthenticated: state.auth.token !== null
    }
};
const mapDispatchToProps=dispatch=>{
    return{
        onTryAutoSignIn:()=>dispatch(Actions.authCheckState())
    }
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(App) );
