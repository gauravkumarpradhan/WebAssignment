import styled from "styled-components";

const StyledOtpInput = styled.input`
    border: 1px solid;
    width: 5rem;
    height: auto;
    color: #ffffff;
    padding: 0.75rem;
    border-radius: 0.375rem;
    display: block;
    background-color: #2d2d2d;
    appearance: none;

    &:focus {
        border-width: 2px;
        outline: none;
    }
`;

export default StyledOtpInput;
