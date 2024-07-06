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
      <button
        style={buttonStyle ? buttonStyle : null}
        className={buttonClassName ? buttonClassName : null}
        onClick={handleModal}
      >
        {buttonText}
      </button>

      <ReactModal
        ariaHideApp={false}
        isOpen={showModal}
        contentLabel="onRequestClose Example"
        onRequestClose={handleModal}
        className="Modal"
        overlayClassName="Overlay"
      >
        {children}
        <LazyMotionWithFeatures features={loadFeatures}>
          <m.button
            whileHover={{}}
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
