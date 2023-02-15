import React from "react";
import ReactDOM from "react-dom/client";

import App from "@/App";
import { ThemeStore } from "@/context/Theme/ThemeStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "react-toastify/dist/ReactToastify.css";
import "@/assets/config.scss";
import "@/assets/global.css";
import "@/assets/darkmode.css";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 60 * 48, // 24 hours
            cacheTime: 1000 * 60 * 60 * 48, // 24 hours
        },
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeStore.Provider>
                <App />
            </ThemeStore.Provider>
        </QueryClientProvider>
    </React.StrictMode>,
);

