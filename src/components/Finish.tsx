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
import { useTranslation } from "react-i18next"

interface FinishProps {
  success: boolean
}

export default function Finish(success: FinishProps) {
  const selectedPokemon = usePokemonStore((state) => state.selectedPokemon)
  const reset = usePokemonStore((state) => state.reset)
  const { t } = useTranslation(["finish"])

  const handleReset = () => {
    reset()
  }

  const getAllPokemons = usePokemonStore((state) => state.getAllPokemons)

  const handleStart = () => {
    reset()
    getAllPokemons()
  }

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {success.success ? t("win-title") : t("lose-title")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <img
              src={selectedPokemon?.sprites}
              alt={selectedPokemon?.name + "Sprite"}
              width={120}
              height={120}
            />
            {selectedPokemon ? formatString(selectedPokemon.name) : null}{" "}
            {t("subtitle")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleReset}>
            {t("back-btn")}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleStart}>
            {t("again-btn")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
