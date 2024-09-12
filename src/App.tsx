import HeroSection from "@/components/HeroSection"
import Footer from "@/components/Footer"
import { usePokemonStore } from "@/store/store"
import Play from "@/components/Play"
import Finish from "@/components/Finish"
import { Header } from "@/components/Header"
import { Suspense } from "react"
import Loader from "@/components/Loader"

function App() {
  const pokemons = usePokemonStore((state) => state.pokemons)
  const selectedPokemon = usePokemonStore((state) => state.selectedPokemon)
  const pokemonsByTheUser = usePokemonStore((state) => state.pokemonsByTheUser)
  const turn = usePokemonStore((state) => state.turn)
  const loading = usePokemonStore((state) => state.loading)

  // Check if the user has guessed the selected Pokémon correctly
  const hasWon = pokemonsByTheUser.some(
    (pokemon) => pokemon.id === selectedPokemon?.id
  )

  return (
    <>
      <Suspense fallback={<Loader />}>
        {loading ? (
          <Loader />
        ) : (
          <>
            <Header />
            {hasWon ? <Finish success={true} /> : null}
            {turn >= 7 && !hasWon ? <Finish success={false} /> : null}
            {pokemons.length > 0 && selectedPokemon ? (
              <Play />
            ) : (
              <HeroSection />
            )}
            <Footer />
          </>
        )}
      </Suspense>
    </>
  )
}

export default App
