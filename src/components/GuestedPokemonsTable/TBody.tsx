import { formatString } from "@/lib/utils"
import { ArrowUp, ArrowDown } from "lucide-react"
import { TableBody, TableRow, TableCell } from "@/components/ui/table"
import { usePokemonStore } from "@/store/store"
import { Badge } from "@/components/ui/badge"
import { useTranslation } from "react-i18next"

export default function TBody() {
  const { t } = useTranslation(["play"])

  const pokemonsByTheUser = usePokemonStore((state) => state.pokemonsByTheUser)
  const selectedPokemon = usePokemonStore((state) => state.selectedPokemon)
  console.log(selectedPokemon)

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
                  key={type}
                  className={
                    selectedTypes.includes(type) ? "bg-green-500" : "bg-red-500"
                  }
                >
                  {formatString(type)}
                </Badge>
              ))}
            </TableCell>
            <TableCell>
              {selectedPokemon ? (
                selectedPokemon.height === pokemon.height ? (
                  selectedPokemon?.height
                ) : selectedPokemon?.height > pokemon.height ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : null}
            </TableCell>
            <TableCell className="text-right">
              {selectedPokemon ? (
                selectedPokemon.weight === pokemon.weight ? (
                  selectedPokemon.weight
                ) : selectedPokemon.weight > pokemon.weight ? (
                  <ArrowUp />
                ) : (
                  <ArrowDown />
                )
              ) : null}
            </TableCell>
            <TableCell>
              <Badge
                variant={"outline"}
                className={
                  selectedPokemon?.evolvesFrom !== null &&
                  pokemon.evolvesFrom !== null
                    ? "bg-green-500"
                    : "bg-red-500"
                }
              >
                {pokemon.evolvesFrom ? t("has-evos") : t("hasnt-evos")}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant={"outline"}
                className={
                  selectedPokemon?.is_default === true &&
                  pokemon.is_default === true
                    ? "bg-green-500"
                    : "bg-red-500"
                }
              >
                {pokemon.is_default === false ? t("has-evos") : t("hasnt-evos")}
              </Badge>
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}
