import React from "react"
import ReactDOM from "react-dom/client"
import "@/index.css"
import { ThemeProvider } from "@/components/ui/theme-provider.tsx"
import "@/site/i18next.config.js"
import { RouterProvider } from "@tanstack/react-router"
import { router } from "@/routes/router"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
