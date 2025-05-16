import { useTranslation } from "react-i18next"
import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./__root"
import { Header } from "@/components/Header"
import { buttonVariants } from "@/components/ui/button"

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
})

function AboutPage() {
  const { t } = useTranslation("about")

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <Header />
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p>{t("intro")}</p>
      <p>{t("description")}</p>
      <a
        href="https://github.com/rafacv23/Pokewordle"
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: "link" })}
      >
        {t("github")}
      </a>
    </div>
  )
}
