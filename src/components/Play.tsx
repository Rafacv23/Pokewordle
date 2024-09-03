import { usePokemonStore } from "@/store/store"
import { Button } from "@/components/ui/button"
import GuestedPokemons from "@/components/GuestedPokemons"

export default function Play() {
  const reset = usePokemonStore((state) => state.reset)
  const handleReset = () => {
    console.log("Borrando datos de los pokemon")
    reset()
  }
  return (
    <div className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <GuestedPokemons />
      <Button onClick={handleReset}>Reset</Button>
    </div>
  )
}
