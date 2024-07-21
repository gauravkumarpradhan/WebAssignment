import React, { useEffect } from "react";
import CreateNewQuote from "../CreateNewQuote";
import { useDispatch, useSelector } from "react-redux";
import { quoteListSelector, userTokenSelector } from "../../store/selectors";
import { fetchQuotesList } from "../../store/reducers";
import styled from "styled-components";

const QuoteListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: separate; /* Use separate borders to enable spacing */
    border-spacing: 0 10px; /* Add vertical spacing between rows */
`;

const Th = styled.th`
    text-align: left;
    padding: 8px;
    background-color: #f2f2f2;
`;

const Td = styled.td`
    padding: 8px;
    border-bottom: 1px solid #ddd;
`;

const Media = styled.img`
    width: 100px;
    height: auto;
    object-fit: cover;
`;

const Text = styled.p`
    font-size: 16px;
    margin: 0;
`;

const QuoteListingSection = () => {
    const dispatch = useDispatch();
    const token = useSelector(userTokenSelector);
    const quoteList = useSelector(quoteListSelector);

    useEffect(() => {
        dispatch(fetchQuotesList({ token, limit: 5, offset: 1 }));
    }, [token]);

    return (
        <div style={{ overflow: "hidden" }}>
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
        </div>
    );
};

export default QuoteListingSection;
