import { useContext, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { m, LazyMotion } from "framer-motion";
import ReactModal from "react-modal";


const loadFeatures = () =>
  import("@/lib/features").then(res => res.default);

const Dialog = ({
  children,
  buttonText,
  buttonStyle,
  wrapperStyle,
  wrapperClassName,
  buttonClassName,


}) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  };



  return (
    <div
      className={wrapperClassName ? wrapperClassName : null}
      style={wrapperStyle ? wrapperStyle : null}
    >
      {/** Open Dialog */}
      <button
        style={buttonStyle ? buttonStyle : null}
        className={buttonClassName ? buttonClassName : null}
        onClick={handleModal}
      >
        {buttonText}
      </button>

      {/** Dialog */}
      <ReactModal
        ariaHideApp={false}
        isOpen={ showModal}
        onRequestClose={handleModal}
        style={{
          content: {
            position: "absolute",
            top: "5px",
            left: "5px",
            right: "5px",
            bottom: '5px',
            background: 'rgb(52,124,207)',
            background: 'radial-gradient(circle, rgba(52,124,207,1) 0%, rgba(255,255,255,1) 100%)',
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
            backgroundColor: "#404040",
          }
        }}
      >
        {children}
        <LazyMotion features={loadFeatures}>
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
