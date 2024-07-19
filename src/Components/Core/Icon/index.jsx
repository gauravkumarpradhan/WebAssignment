import React from 'react'
import Icons from "../../../assets/icons"
import styled from 'styled-components';
import PropTypes from "prop-types";


function Icon({ name, handleClick, ...rest }) {
  const IconComponent = Icons[name];

  const StyledCustomComponent = styled(IconComponent)`
    color:white;
    width:20px;
    height:20px;
    padding: 8px;
    border-radius: 50%;
    background:${rest["background"] || rest["backgroundColor"]};

   &&:hover{
    background: #282653;
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