import styled from "styled-components";

export const Container = styled.button`
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
