import React from "react";
import styled from "styled-components";
import get from "lodash/get";
import PropTypes from "prop-types";

function Flex({
    justify,
    align,
    wrap,
    direction,
    gap,
    width,
    children,
    spacing,
    ...rest
}) {
    const StyledFlex = styled.div({
        display: "flex",
        flexDirection: direction ? direction : "row",
        gap: gap ? gap * 4 : "",
        justifyContent: justify ? justify : "",
        alignItems: align ? align : "",
        flexWrap: wrap ? wrap : "nowrap",
        width: width && width,
        paddingTop: `${get(spacing, "top", 0) * 4}px`,
        paddingBottom: `${get(spacing, "bottom", 0) * 4}px`,
        paddingRight: `${get(spacing, "right", 0) * 4}px`,
        paddingLeft: `${get(spacing, "left", 0) * 4}px`,
        ...rest,
    });

    return <StyledFlex>{children}</StyledFlex>;
}

Flex.propTypes = {
    justify: PropTypes.string,
    align: PropTypes.string,
    direction: PropTypes.string,
    gap: PropTypes.number,
    width: PropTypes.string,
    spacing: PropTypes.object,
    wrap: PropTypes.string,
};

export default Flex;
