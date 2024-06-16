import React,{useState} from 'react'
 const CloseButtone = ({
    children,className
    })=>{
        const [ ,set] =useState(null)
return (
    <button  onClick={handleModal}  
        className="vener-x"
    >
        <FontAwesomeIcon icon={faXmark} />
    </button>
)
}

export default CloseButtone


