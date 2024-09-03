import { usePokemonStore } from "@/store/store"
import { Button } from "@/components/ui/button"
import GuestedPokemons from "@/components/GuestedPokemons"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useState } from "react"

export default function Play() {
  const reset = usePokemonStore((state) => state.reset)
  const pokemons = usePokemonStore((state) => state.pokemons)
  const [filteredPokemons, setFilteredPokemons] = useState(null)
  const addPokemonByTheUser = usePokemonStore(
    (state) => state.addPokemonsByTheUser
  )

  const handleReset = () => {
    console.log("Borrando datos de los pokemon")
    reset()
  }

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase()
    if (searchTerm.length >= 3) {
      const results = pokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm)
      )

      setFilteredPokemons(results)

      //console.log(filteredPokemons)
    }
  }

  const handlePokemonSelect = (pokemon) => {
    addPokemonByTheUser(pokemon)
    console.log(`${pokemon.name} ha sido añadido`)
  }

  return (
    <div className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <GuestedPokemons />
      <form>
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
                ? filteredPokemons.map((pokemon) => (
                    <DropdownMenuItem
                      key={pokemon.name}
                      onClick={() => handlePokemonSelect(pokemon)}
                    >
                      {pokemon.name}
                    </DropdownMenuItem>
                  ))
                : "No Pokemon found"}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </form>
      <Button onClick={handleReset}>Reset</Button>
    </div>
  )
}
