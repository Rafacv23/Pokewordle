// src/routes/__root.tsx
import { createRootRoute, Outlet } from "@tanstack/react-router"

export const rootRoute = createRootRoute({
  component: () => <Outlet />, // you can add a <Navbar /> here too
})
