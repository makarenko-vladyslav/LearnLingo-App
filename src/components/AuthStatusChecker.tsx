"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { subscribeToAuthState } from "../services/authService";
import { AppDispatch } from "../redux/store";

const AuthStatusChecker: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const unsubscribe = subscribeToAuthState(dispatch);
        return () => unsubscribe();
    }, [dispatch]);

    return null;
};

export default AuthStatusChecker;
