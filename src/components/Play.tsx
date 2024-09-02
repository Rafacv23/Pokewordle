import { usePokemonStore } from "@/store/store"
import { Button } from "@/components/ui/button"

export default function Play() {
  const reset = usePokemonStore((state) => state.reset)
  const handleReset = () => {
    console.log("Borrando datos de los pokemon")
    reset()
  }
  return (
    <div>
      Esto es lo que el jugador verá cuando está jugando
      <Button onClick={handleReset}>Reset</Button>
    </div>
  )
}
