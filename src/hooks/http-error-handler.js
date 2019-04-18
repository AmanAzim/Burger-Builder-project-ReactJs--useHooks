import {useState, useEffect} from 'react'

export default (httpClient) =>{

    const [error, setError]=useState(null);


    //these lines will run before the rendering of "return(JSX..)" just like codes inside "componentWillmount()
    const reqInterceptors=httpClient.interceptors.request.use(req=>{
        setError(null);
        return req;
    });
    const resInterceptors=httpClient.interceptors.response.use(res=>res, error => {
        setError(error);
    });


    useEffect(()=>{
        return()=>{ // these code will before the component gets unmounted just like "componentWillUnmount()"
            httpClient.interceptors.response.eject(resInterceptors);
            httpClient.interceptors.request.eject(reqInterceptors);
        };
    }, [resInterceptors, reqInterceptors]);


    const errorConfiremedHandler=()=>{
        setError(null)
    };

    return [error, errorConfiremedHandler];
};
