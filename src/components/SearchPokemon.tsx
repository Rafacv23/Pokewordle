import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { formatString } from "@/lib/utils"
import { Pokemon, usePokemonStore } from "@/store/store"

export default function SearchPokemon({
  loading,
  setLoading,
}: {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}) {
  const { t } = useTranslation(["play"])
  const pokemons = usePokemonStore((state) => state.pokemons)
  const increaseTurn = usePokemonStore((state) => state.increaseTurn)
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[] | null>(
    null
  )

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false) // New state to manage dropdown
  const [searchTerm, setSearchTerm] = useState<string>("") // New state to manage search term

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

  const addPokemonByTheUser = usePokemonStore(
    (state) => state.addPokemonsByTheUser
  )

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredPokemons && filteredPokemons.length > 0) {
      setIsDropdownOpen(true) // Open dropdown on Enter key press
    }
  }

  return (
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
            autoFocus
          />
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
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
                  <DropdownMenuItem disabled>{t("not-found")}</DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </form>
  )
}
