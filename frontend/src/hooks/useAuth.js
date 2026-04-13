import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSlice, logoutSlice, registerSlice, clearAuthError } from "../features/auth/authSlice";
import { useEffect, useCallback } from "react";


const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated, loading, error, allUsers } = useSelector((state) => state.auth);

    const registerHook = useCallback(async (userData) => {
        try {
            const result = await dispatch(registerSlice(userData));
            if (registerSlice.fulfilled.match(result)) {
                navigate("/");
            }
        } catch (error) {
            throw error;
        }
    }, [dispatch, navigate])

    const loginHook = useCallback(async (userData) => {
        try {
            const result = await dispatch(loginSlice(userData));
            if (loginSlice.fulfilled.match(result)) {
                navigate("/");
            }
        } catch (error) {
            throw error;
        }
    }, [dispatch, navigate])

    const logoutHook = useCallback(async () => {
        try {
            return await dispatch(logoutSlice())
        } catch (error) {
            throw error;
        }
    }, [dispatch])

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
        allUsers,
        logoutHook
    };
};

export default useAuth