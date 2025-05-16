import { useTranslation } from "react-i18next"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./__root"
import { Header } from "@/components/Header"

export const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
  component: PrivacyPolicyPage,
})

function PrivacyPolicyPage() {
  const { t } = useTranslation("privacy-policy")

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <Header />
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p>{t("p1")}</p>
      <p>{t("p2")}</p>
      <p>{t("p3")}</p>
    </div>
  )
}
