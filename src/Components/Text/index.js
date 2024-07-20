import React from "react";
import styled from "styled-components";
import FlexItem from "../Core/Flex/FlexItem";

const fontWeights = {
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
};

function Text({ size, weight, children, variant, rest }) {
    const StyledText = styled(FlexItem)`
        font-weight: ${fontWeights?.[weight]};
        font-size: ${size * 4}px;
        color: ${variant};
    `;

    return <StyledText>{children}</StyledText>;
}

Text.defaultProps = {
    variant: "white",
};

export default Text;
