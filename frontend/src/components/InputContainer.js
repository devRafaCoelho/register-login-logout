import styled from "styled-components";

export const InputContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 8px;

    color: ${({ theme }) => theme.colors.gray};

    label {
        font-size: 1.125rem;
        line-height: 1.3125rem;
    }

    input {
        height: 63px;
        padding: 0 24px;

        font-size: 1.125rem;
        line-height: 1.3125rem;

        border-radius: 5px;
        border: 1px solid ${({ theme }) => theme.colors.grayInputBorder};
        color: ${({ theme }) => theme.colors.black};
        background-color: ${({ theme }) => theme.colors.white};
    }
`;
