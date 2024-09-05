import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { MouseEventHandler } from "react"

export function ChangeLanguage() {
  const { t, i18n } = useTranslation(["switch-lang"])

  const switchLanguage =
    (language: string): MouseEventHandler =>
    (event) => {
      event.preventDefault()
      i18n.changeLanguage(language)
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{t("trigger-btn")}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("description")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={switchLanguage("en")}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onClick={switchLanguage("es")}>
            Español
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
