import React, {} from 'react'
import {Route, Redirect, withRouter} from 'react-router-dom'
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery'
import ContactData from './ContactData/ContactData'
import {connect} from 'react-redux'


const Checkout =(props)=>{


    const checkoutCancleHandler=()=>{
        props.history.goBack();
    }
    const checkoutContinueHandler=()=>{
        props.history.replace('/checkout/contact-data');
    }


    let summery=<Redirect to="/"/>;

    if(props.ingredients){
        const purchaseRedirect=props.purchased? <Redirect to="/"/> : null ;
        summery=(
            <div>
                {purchaseRedirect}
                <CheckoutSummery ingredients={props.ingredients}
                                 checkoutCancle={checkoutCancleHandler}
                                 checkoutContinue={checkoutContinueHandler} />
                <Route path={props.match.path+'/contact-data'} component={ContactData}/>
                {/*<Route path={this.props.match.path+'/contact-data'} render={(props)=><ContactData ingredients={this.props.ingredients}
                                                                                                 price={this.props.totalPrice}
                                                                                                 {...props} />} /> */}
            </div>);
    }

    return summery;

};

const mapStateToProps=state=>{
    return{
        ingredients:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
};


export default withRouter(connect(mapStateToProps)(Checkout));
