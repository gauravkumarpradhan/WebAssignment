import React from "react";
import styled from "styled-components";
import Flex from "../Flex/Flex";
import Text from "../../Text";

const StyledInput = styled.input`
    border: 1px solid #ccc;
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.375rem;
    background-color: #2d2d2d;
    color: #fff;
    font-size: 1rem;
    box-sizing: border-box;

    &::placeholder {
        color: #888;
    }

    &:focus {
        border-width: 2px;
        outline: none;
    }
`;

function Input({ label, type, placeholder, name, value, handleChange }) {
    return (
        <Flex direction="column" gap={4}>
            <Text size={4}>{label}</Text>
            <StyledInput
                type={type}
                placeholder={placeholder}
                name={name}
                onChange={handleChange}
                value={value}
            />
        </Flex>
    );
}

export default Input;
