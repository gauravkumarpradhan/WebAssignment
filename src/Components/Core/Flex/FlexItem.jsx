import { get } from "lodash";
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

function FlexItem({
    basis,
    grow,
    shrink,
    hidden,
    handleClick,
    children,
    spacing,
    hoverStyles,
    onDragStart,
    onDragEnter,
    onDragEnd,
    onDragOver,
    ...rest
}) {
    const StyledFlexItem = styled.div({
        flexBasis: basis ? basis : "auto",
        flexGrow: grow ? grow : 0,
        shrink: shrink ? shrink : 1,
        hidden: hidden ? true : false,
        paddingTop: `${get(spacing, "top", 0) * 4}px`,
        paddingBottom: `${get(spacing, "bottom", 0) * 4}px`,
        paddingRight: `${get(spacing, "right", 0) * 4}px`,
        paddingLeft: `${get(spacing, "left", 0) * 4}px`,
        ...rest,
    });

    return (
        <StyledFlexItem
            onClick={handleClick}
            className={rest["className"]}
            draggable={!!rest["draggable"]}
            onDragStart={onDragStart}
            onDragEnter={onDragEnter}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
        >
            {children}
        </StyledFlexItem>
    );
}

FlexItem.propTypes = {
    basis: PropTypes.string,
    grow: PropTypes.number,
    shrink: PropTypes.number,
    hidden: PropTypes.bool,
    spacing: PropTypes.object,
    children: PropTypes.node,
    handleClick: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDragOver: PropTypes.func
};

export default FlexItem;
