import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../../store/actions/exportAllActions'
import {Redirect} from 'react-router-dom'

const Logout =(props)=>{

    useEffect(()=>{
        props.onLogout();
    }, []);

    return(
        <Redirect to="/"/>
    );
}

const mapDispatchToProps=dispatch=>{
    return{
        onLogout:()=>{dispatch(actions.logOut())}
    }
};

export default connect(null,mapDispatchToProps)(Logout);
