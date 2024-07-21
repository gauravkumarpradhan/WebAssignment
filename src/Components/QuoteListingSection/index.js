import React, { useEffect, useState } from "react";
import CreateNewQuote from "../CreateNewQuote";
import { useDispatch, useSelector } from "react-redux";
import {
    isFetchingQuotesListSelector,
    quoteListSelector,
    userTokenSelector,
} from "../../store/selectors";
import { fetchQuotesList } from "../../store/reducers";
import styled from "styled-components";
import StepPagination from "../StepPagination";

const QuoteListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
    background-image: linear-gradient(45deg, #874da2 0%, #c43a30 100%);
    padding: 0px 12px;
    border-radius: 16px;

    @media (max-width: 672px) {
        width: 1200px;
        overflow-x: scroll;
        margin-top: 40px;
    }
`;

const Th = styled.th`
    text-align: left;
    padding: 8px;
    background-color: #f2f2f2;
    font-size: 12px;
    font-weight: 600;
`;

const Td = styled.td`
    padding: 8px;
    border-bottom: 1px solid #ddd;
    font-size: 12px;
    font-weight: 500;
`;

const Media = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    font-size: 12px;
    font-weight: 500;
`;

const Text = styled.p`
    font-size: 16px;
    margin: 0;
    font-size: 12px;
    font-weight: 500;
`;

const QuoteListingSection = () => {
    const dispatch = useDispatch();
    const token = useSelector(userTokenSelector);
    const quoteList = useSelector(quoteListSelector);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(1);
    const isFetchingQuotesList = useSelector(isFetchingQuotesListSelector);

    useEffect(() => {
        if (token) {
            dispatch(
                fetchQuotesList({
                    token,
                    limit: 5,
                    offset,
                    onSuccess: handleFetchQuotesListSuccess,
                })
            );
        }
    }, [token, offset]);

    function handleLoadMore() {
        setOffset(offset + 1);
    }

    function handleFetchQuotesListSuccess(nextList) {
        if (nextList?.length === 0) {
            setHasMore(false);
        }
    }

    return (
        <div>
            <QuoteListWrapper>
                <CreateNewQuote />

                <Table>
                    <thead>
                        <tr>
                            <Th>Image Uploaded</Th>
                            <Th>Username</Th>
                            <Th>Date</Th>
                            <Th>Created At</Th>
                            <Th>Updated At</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {quoteList.map((quote) => (
                            <tr
                                key={quote.id}
                                style={{
                                    background:
                                        "linear-gradient(135deg, #a2c2e2 0%, #f6f9fc 100%)",
                                }}
                            >
                                <Td>
                                    <Media
                                        src={quote.mediaUrl}
                                        alt="quote media"
                                    />
                                </Td>
                                <Td>
                                    <Text>{quote.username}</Text>
                                </Td>
                                <Td>
                                    <Text>
                                        {new Date(
                                            quote.createdAt
                                        ).toLocaleDateString()}
                                    </Text>
                                </Td>
                                <Td>
                                    <Text>{quote.createdAt}</Text>
                                </Td>
                                <Td>
                                    <Text>{quote.updatedAt}</Text>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </QuoteListWrapper>

            <StepPagination
                hasMore={hasMore}
                onLoadMore={handleLoadMore}
                isFetching={isFetchingQuotesList}
            />
        </div>
    );
};

export default QuoteListingSection;
