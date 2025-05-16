import { useTranslation } from "react-i18next"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./__root"
import { Header } from "@/components/Header"

export const howToPlayRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/how-to-play",
  component: HowToPlayPage,
})

function HowToPlayPage() {
  const { t } = useTranslation("how-to-play")

  const steps = t("steps", { returnObjects: true }) as string[]

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <Header />
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <ol className="list-decimal list-inside space-y-2">
        {steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </div>
  )
}
