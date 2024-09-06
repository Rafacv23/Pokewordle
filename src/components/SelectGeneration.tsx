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
import { usePokemonStore } from "@/store/store"

interface Generation {
  value: string
  label: string
}

export default function SelectGeneration() {
  const { t } = useTranslation(["home"])
  const selectedGenerations = usePokemonStore(
    (state) => state.selectedGenerations
  )
  const toggleGeneration = usePokemonStore((state) => state.toggleGeneration)

  const generations: Generation[] = [
    {
      value: "generation-i",
      label: "Generation I",
    },
    {
      value: "generation-ii",
      label: "Generation II",
    },
    {
      value: "generation-iii",
      label: "Generation III",
    },
    {
      value: "generation-iv",
      label: "Generation IV",
    },
    {
      value: "generation-v",
      label: "Generation V",
    },
    {
      value: "generation-vi",
      label: "Generation VI",
    },
    {
      value: "generation-vii",
      label: "Generation VII",
    },
    {
      value: "generation-viii",
      label: "Generation VIII",
    },
    {
      value: "generation-ix",
      label: "Generation IX",
    },
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
            key={generation.value}
            textValue={generation.value}
            checked={selectedGenerations.includes(generation.value)}
            onCheckedChange={() => toggleGeneration(generation.value)}
          >
            {generation.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
