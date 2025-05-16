// src/router.tsx
import { createRouter } from "@tanstack/react-router"
import { rootRoute } from "@/routes/__root"
import { indexRoute } from "@/routes/index"
import { aboutRoute } from "@/routes/about"
import { howToPlayRoute } from "@/routes/how-to-play"
import { privacyPolicyRoute } from "@/routes/privacy-policy"

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  howToPlayRoute,
  privacyPolicyRoute,
])

export const router = createRouter({ routeTree })
