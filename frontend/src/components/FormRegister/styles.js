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
    background-color: #ffffff;

    h1 {
        margin: 61px 0 0;

        font-size: 1.75rem;
        line-height: 2.0625rem;
        font-weight: 500;

        color: #7978d9;
    }

    p {
        margin-bottom: 57px;

        font-weight: 700;
        font-size: 0.875;
        line-height: 1.0625rem;
        font-family: "Lato", sans-serif;

        color: #7b61ff;
    }

    a {
        color: #7b61ff;

        &:hover {
            opacity: 0.7;
        }
    }
`;

export const InputContainer = styled.div`
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

export const Button = styled.button`
    all: unset;
    box-sizing: border-box;

    width: 100%;
    height: 48px;
    margin: 7px 0 12px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-weight: 700;
    font-size: 0.875rem;
    line-height: 1.0625rem;

    border-radius: 5px;
    cursor: pointer;
    transition: all 0.1s ease-in;

    color: #ffffff;
    background-color: #7978d9;

    &:hover {
        opacity: 0.9;
    }
`;
