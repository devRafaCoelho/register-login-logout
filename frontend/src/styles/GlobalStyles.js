import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
    } 

    body {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Rubik', sans-serif;
        background: linear-gradient(115deg,
            rgba(58, 58, 158, 0.8),
            rgba(136, 136, 206, 0.7));
    }
`;
