import React, { useState } from "react";
import styled from "styled-components";
import Text from "../../Text";

const FileUploadWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #2d2d2d;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    margin: 20px auto 0px;
    height: 100px;
`;

const UploadLabel = styled.label`
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    padding: 4px;

    &:hover {
        background-color: #0056b3;
    }
`;

const PreviewContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
    background: linear-gradient(135deg, #a2c2e2 0%, #f6f9fc 100%);
    margin-bottom: ${(props) => props?.marginBottom};
`;

const PreviewImage = styled.img`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
`;

const HiddenFileInput = styled.input`
    display: none;
`;

function FileUpload({ files, handleChange }) {
    return (
        <div className="w-full flex-col gap-1">
            <FileUploadWrapper className="dashed-card-wrapper flex-col justify-center">
                <UploadLabel htmlFor="file-upload">Upload Files</UploadLabel>
                <HiddenFileInput
                    id="file-upload"
                    type="file"
                    multiple
                    onChange={handleChange}
                />
            </FileUploadWrapper>

            {files?.length > 0 ? (
                <PreviewContainer className="card-wrapper" marginBottom="30px">
                    {files.map((src, index) => (
                        <div
                            key={index}
                            className="flex-row justify-between gap-3 w-full align-center"
                        >
                            <PreviewImage
                                key={index}
                                src={src}
                                alt={`preview-${index}`}
                            />

                            <Text variant="black" size={3}>
                                {src?.substring(0, 20) + "...."}
                            </Text>
                        </div>
                    ))}
                </PreviewContainer>
            ) : null}
        </div>
    );
}

export default FileUpload;
