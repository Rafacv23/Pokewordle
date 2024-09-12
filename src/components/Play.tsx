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
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false) // New state to manage dropdown
  const [searchTerm, setSearchTerm] = useState<string>("") // New state to manage search term

  const addPokemonByTheUser = usePokemonStore(
    (state) => state.addPokemonsByTheUser
  )

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    if (term.length >= 3) {
      const results = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(term)
      )
      setFilteredPokemons(results)
    }
  }

  const handlePokemonSelect = async (pokemon: Pokemon) => {
    setLoading(true)
    try {
      await addPokemonByTheUser(pokemon)
      increaseTurn()
    } catch (error) {
      console.error(error)
    } finally {
      setSearchTerm("") // Clear input after selection
      setLoading(false)
    }
  }

  const handleBack = () => {
    reset()
  }

  const handleReset = () => {
    getAllPokemons()
    //reset()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredPokemons && filteredPokemons.length > 0) {
      setIsDropdownOpen(true) // Open dropdown on Enter key press
    }
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
              onKeyDown={handleKeyDown} // Handle key press
              name="search"
              disabled={loading}
              value={searchTerm}
              autoComplete="off"
            />
            <DropdownMenu
              open={isDropdownOpen}
              onOpenChange={setIsDropdownOpen}
            >
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
