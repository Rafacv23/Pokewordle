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

export default function Play() {
  const reset = usePokemonStore((state) => state.reset)
  const pokemons = usePokemonStore((state) => state.pokemons)
  const increaseTurn = usePokemonStore((state) => state.increaseTurn)
  const pokemonsByTheUser = usePokemonStore((state) => state.pokemonsByTheUser)
  const getAllPokemons = usePokemonStore((state) => state.getAllPokemons)
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[] | null>(
    null
  )
  const addPokemonByTheUser = usePokemonStore(
    (state) => state.addPokemonsByTheUser
  )

  const handleBack = () => {
    reset()
  }

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
    addPokemonByTheUser(pokemon)

    increaseTurn()
  }

  const handleReset = () => {
    getAllPokemons()
  }

  return (
    <div className="w-full py-12 md:py-24 lg:py-32 bg-background px-2 mx-auto max-w-screen-xl md:px-6">
      {pokemonsByTheUser.length > 0 && <GuestedPokemons />}
      <form className="grid place-content-center grid-flow-col my-8 space-x-4">
        <Input
          type="search"
          placeholder="Search the name of a Pokemon"
          onChange={handleSearch}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>Search</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              {filteredPokemons && filteredPokemons.length > 0
                ? filteredPokemons.map((pokemon: Pokemon) => (
                    <DropdownMenuItem
                      key={pokemon.name}
                      onClick={() => handlePokemonSelect(pokemon)}
                    >
                      {formatString(pokemon.name)}
                    </DropdownMenuItem>
                  ))
                : "No Pokemon found"}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </form>
      <div className="space-x-4">
        <Button variant="outline" onClick={handleBack}>
          Go Back
        </Button>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </div>
  )
}
