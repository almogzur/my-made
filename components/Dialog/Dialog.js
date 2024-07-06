import { useState } from "react";
import dynamic from 'next/dynamic';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { m, LazyMotion } from "framer-motion";

// Dynamic import for ReactModal, LazyMotion, and loadFeatures
const ReactModal = dynamic(() => import("react-modal"), {
  loading: () => <div>Loading ReactModal...</div>, 
  ssr: false, 
});

const LazyMotionWithFeatures = dynamic(() => import("framer-motion").then(({ m, LazyMotion }) => ({ default: LazyMotion, m })), {
  loading: () => <div>Loading...</div>, 
  ssr: true, 
});

const loadFeatures = () =>
  import("@/lib/features").then(res => res.default);

const Dialog = ({
  children,
  buttonText,
  buttonStyle,
  buttonClassName,
  wrapperStyle,
  wrapperClassName
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div
      className={wrapperClassName ? wrapperClassName : null}
      style={wrapperStyle ? wrapperStyle : null}
    >
     {/**Open Dialog */}
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
        isOpen={showModal}
        contentLabel="onRequestClose Example"
        onRequestClose={handleModal}
        
        style={{
          content:{
            position: "absolute",
            top: "10px",
            left: "10px",
            right: "10px",
            bottom: '10px',
            backgroundColor: "#ececec",
            display:"flex",
            flexDirection:"column",
            justifyFontent:"center",
            alignItems:"center",
            alignContent:'enter',
            borderRadius:"7px",
            overflow:"clip",
          },
          overlay:{
            position: 'fixed',
            top: "100px",
            left: "25px",
            right: "25px",
            bottom: "100px",
            backgroundColor:"#404040",
            borderRadius:"15px",
            }
            

          }}
        
      >
        {children}
        <LazyMotionWithFeatures features={loadFeatures}>
          <m.button
            whileHover={{background:"red"}}
            onClick={handleModal}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              borderRadius: "15px"
            }}
          >
            <FontAwesomeIcon size="2x" icon={faXmark} />
          </m.button>
        </LazyMotionWithFeatures>
      </ReactModal>
    </div>
  );
}

export default Dialog;
