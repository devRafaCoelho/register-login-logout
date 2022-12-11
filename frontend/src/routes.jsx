import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/LogIn";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/Home";
import { getItem } from "./utils/storage";

function RotasProtegidas({ redirectTo }) {
    const autenticado = getItem("token");

    return autenticado ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default function RotasPrincipais() {
    return (
        <Routes>
            <Route path="/" element={<LogInPage />} />
            <Route path="/cadastro" element={<RegisterPage />} />
            <Route element={<RotasProtegidas redirectTo="/" />}>
                <Route path="/home" element={<HomePage />} />
            </Route>
        </Routes>
    );
}
