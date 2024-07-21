import React from "react";
import Button from "./Core/Button";
import styled from "styled-components";
import Icon from "./Core/Icon";
import Text from "./Text";

const FixedButton = styled(Button)`
    position: fixed;
    left: 50%;
    bottom: 20px; /* Adjust as needed */
    z-index: 1000; /* Ensure it stays on top of other content */
    gap: 4px;
    pointer-events: ${(props) => (props?.disable ? "none" : "")};
    padding: 8px;
`;

function StepPagination({ hasMore, onLoadMore, isFetching }) {
    return (
        <FixedButton
            className="flex flex-row justify-between align-center"
            variant="primary"
            onClick={onLoadMore}
            disabled={!hasMore || isFetching}
        >
            {isFetching ? (
                <Icon
                    name={"Loader"}
                    color="white"
                    margin="0px"
                    padding="0px"
                />
            ) : null}
            <Text>Load More</Text>
        </FixedButton>
    );
}

export default StepPagination;
