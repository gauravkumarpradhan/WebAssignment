import React from 'react'
import Icons from "../../../assets/icons"
import styled from 'styled-components';
import PropTypes from "prop-types";


function Icon({ name, handleClick, ...rest }) {
  const IconComponent = Icons[name];

  const StyledCustomComponent = styled(IconComponent)`
    color:${rest?.color ? rest?.color : "black"};
    width:20px;
    height:20px;
    padding: 8px;
    border-radius: 50%;
    background:${rest["background"] || rest["backgroundColor"]};
    cursor:${rest?.cursor};
    margin: ${rest?.margin};
    padding: ${rest?.padding};

   &&:hover{
    background:${rest?.hoverBackgroundColor ? rest?.hoverBackgroundColor : "#282653"} ;
    color:${rest?.hoverIconColor};
   }
`;

  return <div onClick={handleClick}>
    <StyledCustomComponent />
  </div>
}

Icon.propTypes = {
  name: PropTypes.string,
  handleClick: PropTypes.func
}

export default Icon