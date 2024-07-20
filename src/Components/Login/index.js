import React, { useState } from "react";
import Flex from "../Core/Flex/Flex";
import OtpInputWithValidation from "../Core/OtpGenerator";
import CardWrapper from "../Core/CardWrapper";
import Text from "../Text";
import Input from "../Core/Input";
import Button from "../Core/Button";
import { useDispatch, useSelector } from "react-redux";
import { dispatchLogin } from "../../store/reducers";

function Login() {
    const dispatch = useDispatch();
    const [loginFormValues, setLoginFormValues] = useState({
        username: null,
        otp: null,
    });

    function handleSubmit() {
        dispatch(dispatchLogin(loginFormValues));
    }

    function handleFormFieldChange(event) {
        event.preventDefault();
        setLoginFormValues({
            ...loginFormValues,
            [event.target.name]: event.target.value,
        });
    }

    console.log("Form Values ", loginFormValues);

    return (
        <Flex
            justify="center"
            align="center"
            height="100vh"
            background="#065535"
        >
            <CardWrapper
                stylesObject={{
                    width: "500px",
                    background: "#181921",
                    margin: "auto",
                    padding: "30px",
                }}
            >
                <Flex direction="column" gap={8}>
                    <Text size={9} variant={"white"}>
                        Crafto
                    </Text>

                    <form onSubmit={handleSubmit}>
                        <Flex direction="column" gap={8}>
                            <Input
                                type="text"
                                placeholder="Username"
                                name="username"
                                label="Username"
                                value={loginFormValues?.username}
                                handleChange={handleFormFieldChange}
                            />

                            <OtpInputWithValidation
                                numberOfDigits={4}
                                handleChange={handleFormFieldChange}
                            />

                            <Button variant="primary" type="submit">
                                Log in
                            </Button>
                        </Flex>
                    </form>
                </Flex>
            </CardWrapper>
        </Flex>
    );
}

export default Login;
