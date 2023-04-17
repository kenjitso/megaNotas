import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App";
import { ThemeStore } from "@/context/Theme/ThemeStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "react-toastify/dist/ReactToastify.css";
import "@/assets/config.scss";
import "@/assets/global.css";
import "@/assets/darkmode.css";
import { FreteiroStore } from "./context/FreteiroStore";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 60, // 24 hours
            cacheTime: 1000 * 60 * 60, // 24 hours
        },
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeStore.Provider>
                <FreteiroStore.Provider>
                    <App />
                </FreteiroStore.Provider>
            </ThemeStore.Provider>
        </QueryClientProvider>
    </React.StrictMode>,
);

