import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { usePokemonStore } from "@/store/store"
import { formatString } from "@/lib/utils"

export default function GuestedPokemons() {
  const pokemonsByTheUser = usePokemonStore((state) => state.pokemonsByTheUser)

  return (
    <Table className="w-full px-2 mx-auto max-w-screen-xl md:px-6">
      <TableCaption>A list of your recent Pokemon.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Sprite</TableHead>
          <TableHead>Pokemon</TableHead>
          <TableHead>Gen</TableHead>
          <TableHead>Types</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Height</TableHead>
          <TableHead className="text-right">Evo</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pokemonsByTheUser.map((pokemon) => (
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
              {pokemon.generation ? formatString(pokemon.generation) : "None"}
            </TableCell>
            <TableCell>
              {pokemon.types?.map((type) => (
                <span id={type.type.name}>{formatString(type.type.name)} </span>
              ))}
            </TableCell>
            <TableCell>{pokemon.height}</TableCell>
            <TableCell className="text-right">{pokemon.weight}</TableCell>
            <TableCell className="text-right">
              {pokemon.evolvesFrom ? formatString(pokemon.evolvesFrom) : "None"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
