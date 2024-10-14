"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";

interface ClientProvidersProps {
    children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
    return <Provider store={store}>{children}</Provider>;
}
