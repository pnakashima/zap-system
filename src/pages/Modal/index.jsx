// import React from "react";

// const Modal = props => {
//     const { className, modalRef } = props;

//     return(
//         <div ref={modalRef} className={`${className} modal`}>
//             <p>Meu modal!</p>
//         </div>
//     )
// }

// export default Modal;


//Modal.js
import React, { useRef } from "react";
import ReactDom from "react-dom";


const Modal = ({ setShowModal, message }) => {

    // close the modal when clicking outside the modal.
    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setShowModal(false);
        }
    };
    //render the modal JSX in the portal div.
    return ReactDom.createPortal(
        <div className="container" ref={modalRef} onClick={closeModal}>
            <div className="modal">
                {message}
                <button onClick={() => setShowModal(false)}>X</button>
            </div>
        </div>,
        document.getElementById("portal")
    );
};

export default Modal