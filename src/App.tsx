import HeroSection from "@/components/HeroSection"
import ThemeTogglebutton from "@/components/ui/theme-togggle"
import Footer from "@/components/Footer"
import { usePokemonStore } from "@/store/store"
import Play from "@/components/Play"

function App() {
  const pokemons = usePokemonStore((state) => state.pokemons)
  const selectedPokemon = usePokemonStore((state) => state.selectedPokemon)
  const pokemonsByTheUser = usePokemonStore((state) => state.pokemonsByTheUser)
  return (
    <>
      <div className="fixed top-2 right-6">
        <ThemeTogglebutton />
      </div>
      {pokemonsByTheUser.find((pokemon) => pokemon.id === selectedPokemon.id)
        ? "Ganaste" // crear componente para cuando el usuario gana
        : null}
      {pokemons.length > 0 && selectedPokemon ? <Play /> : <HeroSection />}
      <Footer />
    </>
  )
}

export default App
