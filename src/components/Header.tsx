import { ChangeLanguage } from "@/components/ChangeLanguage"
import ThemeTogglebutton from "@/components/ui/theme-togggle"
import { buttonVariants } from "./ui/button"
import { useTranslation } from "react-i18next"

export function Header() {
  const { t } = useTranslation("header")

  return (
    <header className="fixed top-2 right-6 flex items-center space-x-4">
      <div className="sr-only md:not-sr-only">
        <a
          href="/"
          className={buttonVariants({
            variant: "link",
            className: "text-white",
          })}
        >
          {t("play")}
        </a>
        <a
          href="/about"
          className={buttonVariants({
            variant: "link",
            className: "text-white",
          })}
        >
          {t("about")}
        </a>
        <a
          href="/how-to-play"
          className={buttonVariants({
            variant: "link",
            className: "text-white",
          })}
        >
          {t("howToPlay")}
        </a>
        <a
          href="/privacy-policy"
          className={buttonVariants({
            variant: "link",
            className: "text-white",
          })}
        >
          {t("privacy")}
        </a>
      </div>
      <ChangeLanguage />
      <ThemeTogglebutton />
    </header>
  )
}
