import { usePokemonStore } from "@/store/store"
import { Button } from "@/components/ui/button"
import GuestedPokemons from "@/components/GuestedPokemons"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import SearchPokemon from "@/components/SearchPokemon"
import { formatString } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Play() {
  const { t } = useTranslation(["play"])
  const reset = usePokemonStore((state) => state.reset)

  const pokemonsByTheUser = usePokemonStore((state) => state.pokemonsByTheUser)
  const getAllPokemons = usePokemonStore((state) => state.getAllPokemons)
  const generations = usePokemonStore((state) => state.selectedGenerations)

  const [loading, setLoading] = useState<boolean>(false) // to manage the disabled btn and loading state

  const handleBack = () => {
    reset()
  }

  const handleReset = () => {
    getAllPokemons()
    //reset()
  }

  return (
    <div className="w-full py-12 md:py-24 lg:py-32 bg-background px-2 mx-auto max-w-screen-xl md:px-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <small>{t("selected-generations")}</small>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {generations.map((generation) => (
            <DropdownMenuItem key={generation}>
              {formatString(generation)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {pokemonsByTheUser.length > 0 && <GuestedPokemons />}
      <SearchPokemon loading={loading} setLoading={setLoading} />
      <div className="space-x-4">
        <Button variant="outline" onClick={handleBack} disabled={loading}>
          {t("back-btn")}
        </Button>
        <Button variant="outline" onClick={handleReset} disabled={loading}>
          {t("reset-btn")}
        </Button>
      </div>
    </div>
  )
}
