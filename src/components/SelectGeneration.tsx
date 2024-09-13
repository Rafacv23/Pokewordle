import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { usePokemonStore } from "@/store/store"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ToggleGroup } from "./ui/toggle-group"
import { Toggle } from "./ui/toggle"

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
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">{t("dropdown-trigger")}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{t("generations")}</DrawerTitle>
            <DrawerDescription>{t("description")}</DrawerDescription>
          </DrawerHeader>
          <ToggleGroup className='flex flex-col md:flex md:flex-row' type="multiple">
            {generations.map((gen) => (
              <Toggle
                key={gen.value}
                value={gen.value}
                onChange={() => toggleGeneration(gen.value)}
                onClick={() => toggleGeneration(gen.value)}
                pressed={selectedGenerations.includes(gen.value)}
              >
                {gen.label}
              </Toggle>
            ))}
          </ToggleGroup>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>{t("save-btn")}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
