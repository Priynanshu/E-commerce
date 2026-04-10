import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSlice, logoutSlice, registerSlice, clearAuthError } from "../features/auth/authSlice";
import { useEffect } from "react";


const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

    const registerHook = async (userData) => {
        try {
            const result = await dispatch(registerSlice(userData));
            if (registerSlice.fulfilled.match(result)) {
                navigate("/");
            }
        } catch (error) {
            throw error;
        }
    }

    const loginHook = async (userData) => {
        try {
            const result = await dispatch(loginSlice(userData));
            if (loginSlice.fulfilled.match(result)) {
                navigate("/");
            }
        } catch (error) {
            throw error;
        }
    }

    const logoutHook = async () => {
        try {
            return await dispatch(logoutSlice())
        } catch (error) {
            throw error;
        }
    }

   useEffect(() => {
    dispatch(clearAuthError()); 
}, [dispatch]);

    return {
        user,
        isAuthenticated,
        loading,
        error,
        clearAuthError,
        registerHook,
        loginHook,
        logoutHook
    };
};

export default useAuth