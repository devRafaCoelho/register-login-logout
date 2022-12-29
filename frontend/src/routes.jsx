import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import HomePage from "./pages/Home";
import LogInPage from "./pages/LogIn";
import RegisterPage from "./pages/Register";
import { theme } from "./theme";
import { getItem } from "./utils/storage";

function RotasProtegidas({ redirectTo }) {
    const isAuth = getItem("token");

    return isAuth ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default function RotasPrincipais() {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<LogInPage />} />
                <Route path="/cadastro" element={<RegisterPage />} />
                <Route element={<RotasProtegidas redirectTo="/" />}>
                    <Route path="/home" element={<HomePage />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
}
