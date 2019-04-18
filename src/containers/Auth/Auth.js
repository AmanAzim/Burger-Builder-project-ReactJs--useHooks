import React, {useState, useEffect} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import CssAuth from './Auth.module.css'
import Spinner from '../../components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/exportAllActions'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

const Auth =(props)=>{

    const [authForm, setAuthForm]=useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });
    const [isSignup, setIsSignup]=useState(false);

    useEffect(()=>{
        if(!props.buildingBurger && props.authRedirectPath!=='/'){
            props.onSetAuthRedirectPath();
        }
    }, []);


    const checkValidity=(value, rules)=>{
        let isValid=true;

        if(!rules){ // so thah the validation checking operation does not fail. for in case we don;t have the "validation" property in any orderForm item. such as "delivaryMethod"
            isValid=true;
        }

        if(rules.required){
            isValid= value.trim() !=='' && isValid; //isValid is only true when the "value" is not empty
        }

        if(rules.minLength){
            isValid= value.length >= rules.minLength && isValid;
        }

        return isValid;
    };

    const inputChangeHandler=(event, ControlName)=>{

        const updatedControls={
            ...authForm,
            [ControlName]:{
                ...authForm[ControlName],
                value:event.target.value,
                valid:checkValidity(event.target.value, authForm[ControlName].validation),
                touched:true
            }
        };

        setAuthForm(updatedControls);
    };
    const eventPrevent=(event)=>{
        event.preventDefault();
    };
    const onSubmitHandler=(event)=>{
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    };
    const switchAuthModeHandler=()=>{
        setIsSignup(!isSignup);
    };

    const formElementArray=[];
    for(let key in authForm){
        formElementArray.push({id:key, config:authForm[key]});
    }

    let form=formElementArray.map(formElem=>{
        return <Input key={formElem.id}
                      elementType={formElem.config.elementType}
                      elementConfig={formElem.config.elementConfig}
                      value={formElem.config.value}
                      invalid={!formElem.config.valid}
                      shouldValidate={formElem.config.validation}
                      touched={formElem.config.touched}
                      changed={(event)=>inputChangeHandler(event, formElem.id)}/>
    });

    if(props.loading){
        form=<Spinner/>;
    }
    if(props.isAuthenticated){
        form=<Redirect to={props.authRedirectPath}/>
    }

    let errorMessage=null;
    if(props.error){
        errorMessage=(<p>{props.error.message}</p>);
    }

    return (
        <div className={CssAuth.Auth}>
            {errorMessage}
            <form onSubmit={eventPrevent}>
                {form}
                <Button btnType="Success" clicked={onSubmitHandler}>Submit</Button>
                <Button btnType="Danger" clicked={switchAuthModeHandler}>Switch to {isSignup? 'SIGN-IN':'SIGN-UP'}</Button>
            </form>
        </div>
    );
};

const mapPropsToState=state=>{
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !== null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
};
const mapDispatchToProps=dispatch=>{
  return {
      onAuth:(email, password, isSignup)=>dispatch(actions.auth(email, password, isSignup)),
      onSetAuthRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))
  }
};

export default connect(mapPropsToState, mapDispatchToProps)(Auth);
