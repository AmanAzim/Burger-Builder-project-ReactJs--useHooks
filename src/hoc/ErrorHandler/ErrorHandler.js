import React, {useState, useEffect} from 'react'
import Aux from '../Auxiliary'
import Modal from '../../components/UI/Modal/Modal'

const ErrorHandler=(WrappedComponent, axios)=>{
    return (props)=>{

        const [error, setError]=useState(null);


        //these lines will run before the rendering of "return(JSX..)" just like codes inside "componentWillmount()
        const reqInterceptors=axios.interceptors.request.use(req=>{
            setError(null);
            return req;
        });
        const resInterceptors=axios.interceptors.response.use(res=>res, error => {
            setError(error);
        });


        useEffect(()=>{
            return()=>{ // these code will before the component gets unmounted just like "componentWillUnmount()"
                axios.interceptors.response.eject(resInterceptors);
                axios.interceptors.request.eject(reqInterceptors);
            };
        }, [resInterceptors, reqInterceptors]);


        const errorConfiremedHandler=()=>{
            setError(null)
        };


            return (
                <Aux>
                    <Modal show={error} modalClose={errorConfiremedHandler}>
                        {error? error.message : null}
                    </Modal>
                    <WrappedComponent {...props}/>
                </Aux>
            )

    }
};

export default ErrorHandler;
