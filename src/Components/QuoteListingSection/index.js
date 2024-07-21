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
    margin-top: 50px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 10px;
    background-image: linear-gradient(45deg, #874da2 0%, #c43a30 100%);
    padding: 0px 12px;
    border-radius: 16px;
    margin-top: 30px;

    @media (max-width: 672px) {
        width: 1200px;
        overflow-x: scroll;
        margin-top: 40px;
    }
`;

const TableBody = styled.tbody`
    display: block;
    height: 450px; /* Adjust this height as needed */
    overflow: auto;
`;

const TableRow = styled.tr`
    display: table;
    width: 100%;
    table-layout: fixed;
`;

const Th = styled.th`
    text-align: left;
    padding: 8px;
    background-color: #f2f2f2;
    font-size: 12px;
    font-weight: 600;
    position: sticky;
    top: 0;
    z-index: 1; /* Ensure it stays above other content */
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

const HeaderContainer = styled.header`
    width: 100%;
    padding: 1rem 2rem;
    background-color: #4caf50; /* Background color */
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
`;

const Logo = styled.div`
    font-size: 32px;
    font-weight: bold;
    color: black;
    font-style: italic;
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
            <HeaderContainer>
                <Logo>Crafto</Logo>

                <CreateNewQuote />
            </HeaderContainer>

            <QuoteListWrapper>
                <Table>
                    <thead>
                        <TableRow>
                            <Th>Image Uploaded</Th>
                            <Th>Username</Th>
                            <Th>Date</Th>
                            <Th>Created At</Th>
                            <Th>Updated At</Th>
                        </TableRow>
                    </thead>
                    <TableBody>
                        {quoteList.map((quote) => (
                            <TableRow
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
                            </TableRow>
                        ))}
                    </TableBody>
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
