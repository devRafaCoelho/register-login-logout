import styled from "styled-components";

export const Container = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 8px;

    color: #484848;

    label {
        font-size: 1.125rem;
        line-height: 1.3125rem;
    }

    input {
        height: 63px;
        padding: 0 24px;

        display: flex;
        align-items: center;

        font-size: 1.125rem;
        line-height: 1.3125rem;

        border-radius: 5px;
        border: 1px solid #555555;
        color: #000000;
        background-color: #ffffff;
    }
`;
