import styled from "styled-components";

export const Form = styled.form`
    width: 531px;
    margin: 50px 10px;
    padding: 0 32px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 31px;

    border-radius: 2px;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.colors.blackShadow} 0px 5px 15px;

    h1 {
        margin: 61px 0 0;

        font-size: 1.75rem;
        line-height: 2.0625rem;
        font-weight: 500;

        color: ${({ theme }) => theme.colors.purpleButton};
    }

    p {
        margin-bottom: 57px;

        font-weight: 700;
        font-size: 0.875;
        line-height: 1.0625rem;
        font-family: "Lato", sans-serif;

        color: ${({ theme }) => theme.colors.purpleContent};
    }

    a {
        color: ${({ theme }) => theme.colors.purpleContent};

        &:hover {
            opacity: 0.7;
        }
    }
`;
