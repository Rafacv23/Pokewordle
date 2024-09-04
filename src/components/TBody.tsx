import { formatString } from "@/lib/utils"
import { ArrowUp, ArrowDown } from "lucide-react"
import { TableBody, TableRow, TableCell } from "@/components/ui/table"
import { usePokemonStore } from "@/store/store"
import { Badge } from "@/components/ui/badge"

export function TBody() {
  const pokemonsByTheUser = usePokemonStore((state) => state.pokemonsByTheUser)
  const selectedPokemon = usePokemonStore((state) => state.selectedPokemon)

  // Obtén los tipos del Pokémon seleccionado
  const selectedTypes = selectedPokemon?.types || []
  return (
    <TableBody>
      {pokemonsByTheUser.map((pokemon) => {
        return (
          <TableRow key={pokemon.id}>
            <TableCell className="font-medium">
              <img
                className="w-28 h-28 object-cover rounded-md"
                src={pokemon.sprites}
                alt={pokemon.name}
              />
            </TableCell>
            <TableCell>{formatString(pokemon.name)}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  selectedPokemon?.generation === pokemon.generation
                    ? "bg-green-500"
                    : "bg-red-500"
                }
              >
                {pokemon.generation ? formatString(pokemon.generation) : "None"}
              </Badge>
            </TableCell>
            <TableCell>
              {pokemon.types?.map((type) => (
                <Badge
                  variant={"outline"}
                  id={type.type.name}
                  className={
                    selectedTypes.includes(type.type.name)
                      ? "bg-green-500"
                      : "bg-red-500"
                  }
                >
                  {formatString(type.type.name)}
                </Badge>
              ))}
            </TableCell>
            <TableCell>
              {selectedPokemon.height === pokemon.height ? (
                selectedPokemon?.height
              ) : selectedPokemon?.height > pokemon.height ? (
                <ArrowUp />
              ) : (
                <ArrowDown />
              )}
            </TableCell>
            <TableCell className="text-right">
              {selectedPokemon?.weight === pokemon.weight ? (
                selectedPokemon?.weight
              ) : selectedPokemon?.weight > pokemon.weight ? (
                <ArrowUp />
              ) : (
                <ArrowDown />
              )}
            </TableCell>
            <TableCell>
              <Badge
                variant={"outline"}
                className={
                  selectedPokemon?.evolvesFrom === null &&
                  pokemon.evolvesFrom === null
                    ? "bg-red-500"
                    : "bg-green-500"
                }
              >
                {pokemon.evolvesFrom ? "Has" : "None"}
              </Badge>
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}
