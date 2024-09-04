import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { formatString } from "@/lib/utils"
import { usePokemonStore } from "@/store/store"

export function Lose() {
  const selectedPokemon = usePokemonStore((state) => state.selectedPokemon)
  const reset = usePokemonStore((state) => state.reset)

  const handleReset = () => {
    reset()
  }

  const getAllPokemons = usePokemonStore((state) => state.getAllPokemons)

  const handleStart = () => {
    getAllPokemons()
  }

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sorry, better luck next time</AlertDialogTitle>
          <AlertDialogDescription>
            <img
              src={selectedPokemon?.sprites}
              alt={selectedPokemon?.name + "Sprite"}
              width={120}
              height={120}
            />
            {selectedPokemon ? formatString(selectedPokemon.name) : null} was
            the secret Pokemon.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleReset}>Go Home</AlertDialogCancel>
          <AlertDialogAction onClick={handleStart}>
            Play Again
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
