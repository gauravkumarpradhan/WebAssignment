import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function CardWrapper({ color, background, onClick, stylesObject, children }) {
    const StyledCardWrapper = styled.div({
        color: color,
        borderRadius: "8px",
        padding: "8px 12px",
        background: background,
        cursor: "pointer",
        ...stylesObject,
    });

    return <StyledCardWrapper onClick={onClick}>{children}</StyledCardWrapper>;
}

CardWrapper.propTypes = {
    children: PropTypes.node,
    stylesObject: PropTypes.object,
    color: PropTypes.string,
    background: PropTypes.string,
};

CardWrapper.defaultProps = {
    stylesObject: {},
};

export default CardWrapper;
