"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import Home from "../pages/Home";
import Header from "../components/Header";

export default function Page() {
    return (
        <Provider store={store}>
            <Header />

            <main className="container">
                <Home />
            </main>
        </Provider>
    );
}
