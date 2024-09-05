import HeroSection from "@/components/HeroSection"
import Footer from "@/components/Footer"
import { usePokemonStore } from "@/store/store"
import Play from "@/components/Play"
import Finish from "@/components/Finish"
import { Header } from "@/components/Header"
import { Suspense } from "react"

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
      <Suspense fallback="Loading...">
        <Header />

        {hasWon ? <Finish success={true} /> : null}
        {turn >= 5 && !hasWon ? <Finish success={false} /> : null}

        {pokemons.length > 0 && selectedPokemon ? <Play /> : <HeroSection />}

        <Footer />
      </Suspense>
    </>
  )
}

export default App
