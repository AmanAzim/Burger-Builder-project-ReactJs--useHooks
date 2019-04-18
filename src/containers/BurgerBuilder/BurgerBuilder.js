import React, {useState, useEffect} from 'react'
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery'
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-orders'
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler'
import {connect} from 'react-redux'
import * as Actions from '../../store/actions/exportAllActions'



const BurgerBuilder =(props)=>{

    const [purchasing, setPurchasing]=useState(false);

    useEffect(()=>{
        props.onInitIngredients();
    }, [])



    const updatePurchaseState=(UpdatedIngredients)=>{
        const sum=Object.keys(UpdatedIngredients).map(igKey=>{
                    return UpdatedIngredients[igKey];
        }).reduce((accumulator, elem)=>{return accumulator+elem}, 0);

        return sum>0;
    };

    const purchsingHandler=()=>{
        if(props.isAuthenticated){
           setPurchasing(true);
        }else{
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }

    };

    const purchaseCancelHandler=()=>{
        setPurchasing(false);
    };
    const purchaseContinueHandler=()=>{

        props.onInitPurchase();
        props.history.push({pathname:'/checkout'});// after adding Redux to this app we didnt need to send the ingredients as query paramitter so we do this
    };




    const disabledInfo={...props.ingredients};
    for(let key in disabledInfo){
        disabledInfo[key]=disabledInfo[key]<=0;
    }

    let orderSummery=null;

    let burger_buildControl=props.error? <p>Ingredients can't be loaded</p> : <Spinner/>;

    if(props.ingredients){
        burger_buildControl=<Aux>
            <Burger ingredients={props.ingredients}/>
            <BuildControls ingredientAdder={props.onIngredientAdd}
                           ingredientRemover={props.onIngredientRemove}
                           disabled={disabledInfo}
                           price={props.totalPrice}
                           purchasable={updatePurchaseState(props.ingredients)}
                           purchasing={purchsingHandler}
                           isAuthenticated={props.isAuthenticated}/>
        </Aux>;

        orderSummery= <OrderSummery ingredients={props.ingredients}
                                    purchaseCancel={purchaseCancelHandler}
                                    purchaseContinue={purchaseContinueHandler}
                                    price={props.totalPrice}/>;
    }


    return(
        <Aux>
            <Modal show={purchasing} modalClose={purchaseCancelHandler}>
                {orderSummery}
            </Modal>

            {burger_buildControl}
        </Aux>
    );
};

const mapStateToProps=state=>{
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated:state.auth.token !== null
    }
};

const mapDispatchToProps=dispatch=>{
    return {
        onIngredientAdd:(ingredientName)=>dispatch(Actions.addIngredients(ingredientName)),
        onIngredientRemove:(ingredientName)=>dispatch(Actions.removeIngredients(ingredientName)),
        onInitIngredients:()=>{dispatch(Actions.asyn_initIngredients())},
        onInitPurchase:()=>dispatch(Actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(Actions.setAuthRedirectPath(path))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));

