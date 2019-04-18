import React, {useEffect} from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import * as Actions from "../../store/actions/exportAllActions";
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'

const Orders =(props)=>{

    useEffect(()=>{
        props.onFetchOrders(props.token, props.userId);
    }, []);

    let orders=<Spinner/>;

    if(!props.loading){
        orders=props.orders.map( order=>{
            return <Order key={order.id} ingredients={order.ingredients} price={+order.price}/>
        })
    }

    return(
        <div>
            {orders}
        </div>
    )
}

const mapStateToProps=state=>{
    return {
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onFetchOrders:(token, userId)=>dispatch(Actions.fetchOrders(token, userId))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));
