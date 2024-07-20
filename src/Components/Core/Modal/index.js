import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./Modal.css"; // Add your styles here
import PropTypes from "prop-types";

const Portal = ({
    children,
    destinationContainer = document.body,
    toAppShell = false,
}) => {
    return createPortal(
        children,
        toAppShell ? document.getElementById("root") : destinationContainer
    );
};

export default function Modal({
    children,
    open = true,
    className,
    onClose,
    innerContainerClasses,
}) {
    const appShell = document.getElementById("root");

    const [isModalOpen, setIsModalOpen] = useState(open);

    const innerContainerRef = useRef();

    if (isModalOpen) {
        appShell.classList.add("root-modal-open");
    } else {
        appShell.classList.remove("root-modal-open");
    }

    useEffect(() => {
        setIsModalOpen(open);
    }, [open]);

    return (
        <Portal>
            <>
                {isModalOpen ? (
                    <div
                        id="modal"
                        className={`${
                            isModalOpen ? "modal-open" : ""
                        } ${className}`}
                    >
                        <div
                            className={`top-1/2 left-1/2  rounded-2xl overflow-hidden ${
                                innerContainerClasses.indexOf("bg") < 0 &&
                                "bg-white"
                            } ${innerContainerClasses}`}
                            ref={innerContainerRef}
                        >
                            {children}
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </>
        </Portal>
    );
}

Modal.propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    className: PropTypes.string,
    innerContainerClasses: PropTypes.string,
};

Modal.defaultProps = {
    className: "flex justify-center items-center",
    onClose: (event) => {},
    innerContainerClasses: "",
};
