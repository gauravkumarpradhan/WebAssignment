import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Core/Button";
import Modal from "../Core/Modal";
import Input from "../Core/Input";
import FileUpload from "../Core/FileUpload";
import Text from "../Text";
import Icon from "../Core/Icon";
import { useDispatch, useSelector } from "react-redux";
import { dispatchCreateNewQuote, fetchMediaUrl } from "../../store/reducers";
import { userTokenSelector } from "../../store/selectors";

const StyledButton = styled(Button)`
    background-color: #4caf50; /* Green background */
    color: white;
    position: fixed; /* Fixed position */
    bottom: 20px; /* Distance from the bottom of the viewport */
    right: 20px; /* Distance from the right of the viewport */
    z-index: 1000; /* Ensure it appears above other content */
    display: ${(props) => (!props?.show ? "none" : "")};

    &:hover {
        background-color: #45a049; /* Darker green on hover */
    }
`;

function CreateNewQuote() {
    const token = useSelector(userTokenSelector);
    const [open, setOpen] = useState(false);
    const [createNewQuote, setCreateNewQuote] = useState({
        text: "",
        mediaUrl: "",
    });
    const dispatch = useDispatch();
    function toggleCreateNewQuoteModal() {
        setOpen(!open);
    }

    const CardWrapper = styled.div`
        width: 500px;
        background: #ada8d3;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

        @media (max-width: 566px) {
            width: 300px;
        }

        @media (max-width: 400px) {
            width: 250px;
        }
    `;

    function handleFileUploadChange(event) {
        dispatch(
            fetchMediaUrl({
                payload: event.target.files?.[0],
                onSuccess: (value) => {
                    setCreateNewQuote({
                        ...createNewQuote,
                        mediaUrl: value?.[0]?.url,
                    });
                },
            })
        );
    }

    function handleCreateNewQuoteButton() {
        dispatch(
            dispatchCreateNewQuote({
                payload: createNewQuote,
                token,
                onSuccess: () => {
                    handleCloseModal();
                    toggleCreateNewQuoteModal();
                },
            })
        );
    }

    function handleCloseModal() {
        setCreateNewQuote({
            text: "",
            mediaUrl: "",
        });
    }

    return (
        <div>
            <StyledButton
                variant="primary"
                onClick={toggleCreateNewQuoteModal}
                show={!open}
            >
                Create New Quote
            </StyledButton>

            {open ? (
                <Modal
                    onClose={toggleCreateNewQuoteModal}
                    open={open}
                    innerContainerClasses="flex-row align-center justify-center h-full"
                >
                    <CardWrapper>
                        <div
                            style={{
                                width: "100%",
                                textAlign: "right",
                                borderBottom: "1px solid #2d2d2d",
                            }}
                            className="flex flex-row justify-between"
                        >
                            <Text>Create New Quote</Text>

                            <div onClick={toggleCreateNewQuoteModal}>
                                <Icon
                                    name={"CloseIcon"}
                                    hoverIconColor="white"
                                    cursor="pointer"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full">
                            <FileUpload
                                files={
                                    createNewQuote?.mediaUrl
                                        ? [createNewQuote.mediaUrl]
                                        : []
                                }
                                handleChange={handleFileUploadChange}
                            />

                            <Input
                                type="text"
                                label="Quote Text"
                                classes="w-full"
                            />
                        </div>

                        <Button
                            variant="primary"
                            marginTop="30"
                            onClick={handleCreateNewQuoteButton}
                        >
                            Create New Quote
                        </Button>
                    </CardWrapper>
                </Modal>
            ) : null}
        </div>
    );
}

export default CreateNewQuote;
