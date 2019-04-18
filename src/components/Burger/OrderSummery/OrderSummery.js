import React from 'react'
import Aux from '../../../hoc/Auxiliary'
import Button from '../../UI/Button/Button'

const OrderSummery =(props)=>{

    const ingredientsSummmery=Object.keys(props.ingredients).map(igkey=>{
        return <li key={igkey}><span style={{textTransform:'capitalize'}}>{igkey}</span>: {props.ingredients[igkey]}</li>;
    });

    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientsSummmery}
            </ul>
            <p><b>Total Price: ${props.price.toFixed(2)}</b></p>
            <p>Continue to check out ?</p>
            <Button btnType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
        </Aux>
    );

};

export default OrderSummery;
