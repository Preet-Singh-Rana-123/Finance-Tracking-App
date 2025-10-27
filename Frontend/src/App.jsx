import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Dashboard } from "./pages/Dashboard";
import { Budget } from "./pages/Budget";
import { Login } from "./pages/Login";
import PrivateRoute from "./services/PrivateRoute";
import { Transaction } from "./pages/Transaction";
import { AiInsight } from "./pages/AiInsight";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { syncUserAcrossTabs } from "./redux/authSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleStorage = () => dispatch(syncUserAcrossTabs());
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, [dispatch]);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route
                        path="/aiInsight"
                        element={
                            <PrivateRoute>
                                <AiInsight />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/budget"
                        element={
                            <PrivateRoute>
                                <Budget />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/transaction"
                        element={
                            <PrivateRoute>
                                <Transaction />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
