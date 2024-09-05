import { ChangeLanguage } from "@/components/ChangeLanguage"
import ThemeTogglebutton from "@/components/ui/theme-togggle"

export function Header() {
  return (
    <header className="fixed top-2 right-6 flex space-x-4">
      <ChangeLanguage />
      <ThemeTogglebutton />
    </header>
  )
}
