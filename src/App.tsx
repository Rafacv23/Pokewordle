import HeroSection from "@/components/HeroSection"
import ThemeTogglebutton from "@/components/ui/theme-togggle"
import Footer from "@/components/Footer"
import { usePokemonStore } from "@/store/store"
import Play from "@/components/Play"
import { Win } from "@/components/Win"
import { Lose } from "@/components/Lose"

function App() {
  const pokemons = usePokemonStore((state) => state.pokemons)
  const selectedPokemon = usePokemonStore((state) => state.selectedPokemon)
  const pokemonsByTheUser = usePokemonStore((state) => state.pokemonsByTheUser)
  const turn = usePokemonStore((state) => state.turn)

  // Check if the user has guessed the selected Pokémon correctly
  const hasWon = pokemonsByTheUser.some(
    (pokemon) => pokemon.id === selectedPokemon?.id
  )

  return (
    <>
      <div className="fixed top-2 right-6">
        <ThemeTogglebutton />
      </div>
      {hasWon ? <Win /> : null}
      {turn > 5 && !hasWon ? <Lose /> : null}
      {pokemons.length > 0 && selectedPokemon ? <Play /> : <HeroSection />}
      <Footer />
    </>
  )
}

export default App
