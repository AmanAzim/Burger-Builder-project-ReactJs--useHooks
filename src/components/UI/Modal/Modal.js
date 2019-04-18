import React, {useEffect} from 'react'
import CssModal from './Modal.module.css'
import BackDrop from '../Backdrop/BackDrop'
import Aux from '../../../hoc/Auxiliary'

const Modal =(props)=>{


    return(
        <Aux>
            <BackDrop show={props.show} clicked={props.modalClose}/>
            <div className={CssModal.Modal}
                 style={{transform:props.show? 'translateY(0)':'translateY(-100vh)',
                     opacity:props.show? '1':'0'}}>
                {props.children}
            </div>
        </Aux>
    )

};

export default React.memo(Modal, (prevProps, nextProps)=>(nextProps.show === prevProps.show && nextProps.children === prevProps.children));
