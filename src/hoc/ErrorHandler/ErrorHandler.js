import React from 'react'
import Aux from '../Auxiliary'
import Modal from '../../components/UI/Modal/Modal'
import useHttpErrorHandler from '../../hooks/http-error-handler'

const ErrorHandler=(WrappedComponent, axios)=>{
    return (props)=>{

            const [error, clearError]=useHttpErrorHandler(axios); //the two things returned from the custom hook// we can name them as we like we dont have to use the exact name we used to return them from the custom hook


            return (
                <Aux>
                    <Modal show={error} modalClose={clearError}>
                        {error? error.message : null}
                    </Modal>
                    <WrappedComponent {...props}/>
                </Aux>
            )

    }
};

export default ErrorHandler;
