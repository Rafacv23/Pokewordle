import { Pokemon, usePokemonStore } from "@/store/store"
import { Button } from "@/components/ui/button"
import GuestedPokemons from "@/components/GuestedPokemons"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChangeEvent, useState } from "react"
import { formatString } from "@/lib/utils"
import { useTranslation } from "react-i18next"
import { Label } from "@/components/ui/label"

export default function Play() {
  const { t } = useTranslation(["play"])
  const reset = usePokemonStore((state) => state.reset)
  const pokemons = usePokemonStore((state) => state.pokemons)
  const increaseTurn = usePokemonStore((state) => state.increaseTurn)
  const pokemonsByTheUser = usePokemonStore((state) => state.pokemonsByTheUser)
  const getAllPokemons = usePokemonStore((state) => state.getAllPokemons)
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[] | null>(
    null
  )

  const [loading, setLoading] = useState<boolean>(false) // to manage the disabled btn and loading state

  const addPokemonByTheUser = usePokemonStore(
    (state) => state.addPokemonsByTheUser
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.toLowerCase()
    if (searchTerm.length >= 3) {
      const results = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
      )
      setFilteredPokemons(results)
    }
  }

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setLoading(true)
    addPokemonByTheUser(pokemon)
    increaseTurn()
    setLoading(false)
  }

  const handleBack = () => {
    reset()
  }

  const handleReset = () => {
    getAllPokemons()
  }

  return (
    <div className="w-full py-12 md:py-24 lg:py-32 bg-background px-2 mx-auto max-w-screen-xl md:px-6">
      {pokemonsByTheUser.length > 0 && <GuestedPokemons />}
      <form className="grid place-content-center grid-flow-col my-8 space-x-4">
        <div>
          <Label htmlFor="search">{t("input-label")}</Label>
          <div className="flex space-x-2">
            <Input
              type="search"
              placeholder={t("input-placeholder")}
              onChange={handleSearch}
              name="search"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button disabled={loading}>{t("search-btn")}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  {filteredPokemons && filteredPokemons.length > 0 ? (
                    filteredPokemons.map((pokemon: Pokemon) => (
                      <DropdownMenuItem
                        key={pokemon.name}
                        onClick={() => handlePokemonSelect(pokemon)}
                      >
                        {formatString(pokemon.name)}
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuItem disabled>
                      {t("not-found")}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </form>
      <div className="space-x-4">
        <Button variant="outline" onClick={handleBack}>
          {t("back-btn")}
        </Button>
        <Button variant="outline" onClick={handleReset}>
          {t("reset-btn")}
        </Button>
      </div>
    </div>
  )
}
