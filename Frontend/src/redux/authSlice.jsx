import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const token = localStorage.getItem("token");

let initialUser = null;
if (token) {
    try {
        const decode = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decode.exp && decode.exp > now) {
            initialUser = decode;
        } else {
            localStorage.removeItem("token");
        }
    } catch {
        localStorage.removeItem("token");
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: token || null,
        user: initialUser,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload;
            state.user = jwtDecode(action.payload);
            localStorage.setItem("token", action.payload);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
        },
        syncUserAcrossTabs: (state) => {
            const newToken = localStorage.getItem(token);
            if (newToken) {
                try {
                    state.token = newToken;
                    state.user = jwtDecode(newToken);
                } catch {
                    state.token = null;
                    state.user = null;
                }
            } else {
                state.token = null;
                state.user = null;
            }
        },
    },
});

export const { loginSuccess, logout, syncUserAcrossTabs } = authSlice.actions;
export default authSlice.reducer;
