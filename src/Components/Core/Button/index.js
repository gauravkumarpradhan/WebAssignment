import styled from "styled-components";

const Button = styled.button`
    background-color: ${(props) =>
        props.variant === "primary"
            ? "#007bff"
            : props.variant === "secondary"
            ? "#6c757d"
            : "#cccccc"};
    color: ${(props) =>
        props.variant === "primary" || props.variant === "secondary"
            ? "#fff"
            : "#333"};
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    opacity: ${(props) => (props.disabled ? "0.65" : "1")};
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: ${(props) =>
            props.variant === "primary"
                ? "#0056b3"
                : props.variant === "secondary"
                ? "#5a6268"
                : "#b3b3b3"};
        transform: ${(props) => !props.disabled && "scale(1.05)"};
    }

    &:active {
        transform: ${(props) => !props.disabled && "scale(1.02)"};
    }
    margin-top: ${(props) => props?.marginTop}px;
`;

export default Button;
