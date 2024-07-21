import React, { useEffect, useRef, useState } from "react";
import StyledOtpInput from "./StyledOtpInput";
import Text from "../../Text";

export default function OtpInputWithValidation({
    numberOfDigits,
    name,
    handleChange: onOtpInputChange,
}) {
    const [otp, setOtp] = useState([]);
    const otpBoxReference = useRef([]);

    function handleChange(value, index) {
        let newArr = [...otp];
        newArr[index] = value;
        setOtp(newArr);

        if (value && index < numberOfDigits - 1) {
            otpBoxReference.current[index + 1].focus();
        }
    }

    function handleBackspaceAndEnter(e, index) {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            otpBoxReference.current[index - 1].focus();
        }
        if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
            otpBoxReference.current[index + 1].focus();
        }
    }

    useEffect(() => {
        if (otp?.length > 0) {
            onOtpInputChange({
                target: { name, value: Number(otp?.join("")) },
            });
        }
    }, [JSON.stringify(otp)]);

    return (
        <div className="flex-col gap-4">
            <Text size={4}>One Time Password (OTP)</Text>

            <div className="flex flex-row gap-4">
                {[...new Array(4)].map((digit, index) => (
                    <StyledOtpInput
                        className="otp-input"
                        key={index}
                        value={otp?.[index]}
                        maxLength={1}
                        onChange={(e) => handleChange(e.target.value, index)}
                        onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                        ref={(reference) =>
                            (otpBoxReference.current[index] = reference)
                        }
                    />
                ))}
            </div>
        </div>
    );
}
