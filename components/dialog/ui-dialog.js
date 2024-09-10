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
  CloseDialogButtonStyle,
  wrapperStyle,
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
      style={wrapperStyle ? wrapperStyle : null}
    >
      {/** Closed*/}
      <m.button
          transition={{duration:0.5, stiffness:50}}
          whileHover={{
             boxShadow: `4px 4px 2px  ${Colors.c} inset `,
             scale:1.1
           }}
          whileTap={{
             boxShadow: `1px 1px 1px  ${Colors.c} inset `,
           }}
          style={CloseDialogButtonStyle ? CloseDialogButtonStyle : null}
          onClick={handleModal}
      >
        <strong>{buttonText}</strong>
      </m.button>

      {/** Open */}
      <ReactModal
        ariaHideApp={false}
        isOpen={ perentOpenModle ? perentOpenModle :  showModal}
        onRequestClose={handleModal}
        style={{
          content: {
            position: "absolute",
            top: "3px",
            left: "3px",
            right: "3px",
            bottom: '3px',
            background: 'rgb(52,124,207)',
            background: `radial-gradient(circle, ${Colors.c} 0%, ${"#fff"} 100%)`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: 'center',
            borderRadius: "2px",
            overflowX:"scroll"
          },
          overlay: {
            position: 'fixed',
            top: "50px",
            left: "5px",
            right: "5px",
            bottom: "70px",
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
