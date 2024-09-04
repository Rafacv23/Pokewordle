import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { usePokemonStore } from "@/store/store"
import { formatString } from "@/lib/utils"
import { ArrowDown, ArrowUp } from "lucide-react"

export default function GuestedPokemons() {
  const pokemonsByTheUser = usePokemonStore((state) => state.pokemonsByTheUser)
  const selectedPokemon = usePokemonStore((state) => state.selectedPokemon)
  const turn = usePokemonStore((state) => state.turn)

  // Obtén los tipos del Pokémon seleccionado
  const selectedTypes = selectedPokemon?.types || []

  return (
    <Table className="w-full px-2 mx-auto max-w-screen-xl md:px-6">
      <TableCaption>Remaining attempts {5 - turn}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Sprite</TableHead>
          <TableHead>Pokemon</TableHead>
          <TableHead>Gen</TableHead>
          <TableHead>Types</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Height</TableHead>
          <TableHead>Evo</TableHead>
        </TableRow>
      </TableHeader>
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
                  variant={"outline"}
                  className={
                    selectedPokemon?.generation === pokemon.generation
                      ? "bg-green-500"
                      : "bg-red-500"
                  }
                >
                  {pokemon.generation
                    ? formatString(pokemon.generation)
                    : "None"}
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
    </Table>
  )
}
