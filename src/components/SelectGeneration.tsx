import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { useTranslation } from "react-i18next"

export default function SelectGeneration() {
  const { t } = useTranslation(["home"])

  // const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  // const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  // const [showPanel, setShowPanel] = React.useState<Checked>(false)

  const generations: string[] = [
    "Generation 1",
    "Generation 2",
    "Generation 3",
    "Generation 4",
    "Generation 5",
    "Generation 6",
    "Generation 7",
    "Generation 8",
    "Generation 9",
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{t("dropdown-trigger")}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{t("generations")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {generations.map((generation) => (
          <DropdownMenuCheckboxItem
            key={generation}
            checked={generation === "Generation 6"}
          >
            {generation}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
