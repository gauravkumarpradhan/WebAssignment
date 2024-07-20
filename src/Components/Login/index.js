import React, { useState } from "react";
import OtpInputWithValidation from "../Core/OtpGenerator";
import Text from "../Text";
import Input from "../Core/Input";
import Button from "../Core/Button";
import { useDispatch } from "react-redux";
import { dispatchLogin } from "../../store/reducers";
import styled from "styled-components";

const StyledLoginDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #065535;

    .login-form-section {
        width: 500px;
        background: #181921;
        margin: auto;
        padding: 30px;
    }
`;

function Login() {
    const dispatch = useDispatch();
    const [loginFormValues, setLoginFormValues] = useState({
        username: "",
        otp: "",
    });

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(dispatchLogin(loginFormValues));
    }

    function handleFormFieldChange(event) {
        setLoginFormValues({
            ...loginFormValues,
            [event.target.name]: event.target.value?.toString(),
        });
    }

    return (
        <StyledLoginDiv>
            <div className="card-wrapper login-form-section">
                <div className="flex-col gap-3">
                    <Text size={9} variant={"white"}>
                        Crafto
                    </Text>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <Input
                                type="text"
                                placeholder="Username"
                                name="username"
                                label="Username"
                                handleChange={handleFormFieldChange}
                            />

                            <OtpInputWithValidation
                                numberOfDigits={4}
                                handleChange={handleFormFieldChange}
                                name="otp"
                                value={loginFormValues?.otp}
                            />

                            <Button variant="primary" type="submit">
                                Log in
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </StyledLoginDiv>
    );
}

export default Login;
