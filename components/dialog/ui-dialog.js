import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { m, LazyMotion } from "framer-motion";
import ReactModal from "react-modal";
import Colors from "../../lib/colors";
import f from '../../lib/features'

const Dialog = ({
  children,
  buttonText,
  buttonStyle,
  wrapperStyle,
  wrapperClassName,
  buttonClassName,
  perentOpenModle,
  setPerentOpenModle


}) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
     if(perentOpenModle){
        setPerentOpenModle(!perentOpenModle)
     }else{
    setShowModal(!showModal);
     }
  }



  return (
    <div
      className={wrapperClassName ? wrapperClassName : null}
      style={wrapperStyle ? wrapperStyle : null}
    >
      {/** Open Dialog */}
      <m.button
          transition={{duration:0.5, stiffness:50}}
        whileHover={{
          boxShadow: `4px 4px 2px  ${Colors.c} inset `,
          scale:1.1
        }}
        whileTap={{
          boxShadow: `1px 1px 1px  ${Colors.c} inset `,

        }}
        
        style={buttonStyle ? buttonStyle : null}
        className={buttonClassName ? buttonClassName : null}
        onClick={handleModal}
      >
        <strong>{buttonText}</strong>
      </m.button>

      {/** Dialog */}
      <ReactModal
        ariaHideApp={false}
        isOpen={ perentOpenModle ? perentOpenModle :  showModal}
        onRequestClose={handleModal}
        style={{
          content: {
            position: "absolute",
            top: "5px",
            left: "5px",
            right: "5px",
            bottom: '5px',
            background: 'rgb(52,124,207)',
            background: `radial-gradient(circle, ${Colors.c} 0%, ${"#fff"} 100%)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: 'center',
            borderRadius: "2px",
            overflow: "clip",
          },
          overlay: {
            position: 'fixed',
            top: "100px",
            left: "25px",
            right: "25px",
            bottom: "100px",
            borderRadius:"8px"
          }
        }}
      >
        {children}
        <LazyMotion features={f}>
          <m.button
            whileHover={{ background: "red" }}
            onClick={handleModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              borderRadius: "15px"
            }}
          >
            <FontAwesomeIcon size="2x" icon={faTimes} />
          </m.button>
        </LazyMotion>
      </ReactModal>

    </div>
  );
}

export default Dialog;
