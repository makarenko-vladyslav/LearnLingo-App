"use client";

import LoginAndRegisterForm from "../components/LoginAndRegisterForm";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import Home from "../pages/Home";

export default function Page() {
    return (
        <Provider store={store}>
            <div className="">
                <header className="">
                    <nav className=""></nav>
                </header>

                <main className="container">
                    {/* <LoginAndRegisterForm mode="register" />
                    <LoginAndRegisterForm mode="login" /> */}

                    <Home />
                </main>
            </div>
        </Provider>
    );
}
