import React, {useState, useEffect} from 'react';

function Modal(props){
    const [modalId, setModalId] = useState(0);

    function registerModal(modalId, setModalId){
        if(!modalId){
        }
    }
    useEffect(() => {
        setTimeout(() => registerModal(modalId, setModalId), 100);
        return () => {
        };
    }, [])

    return null;
}

export default React.memo(Modal);