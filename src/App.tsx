import HeroSection from "@/components/HeroSection"
import ThemeTogglebutton from "@/components/ui/theme-togggle"
import Footer from "@/components/Footer"
import { usePokemonStore } from "@/store/store"
import Play from "@/components/Play"

function App() {
  const pokemons = usePokemonStore((state) => state.pokemons)
  return (
    <>
      <div className="fixed top-2 right-6">
        <ThemeTogglebutton />
      </div>
      {pokemons.length > 0 ? <Play /> : <HeroSection />}
      <Footer />
    </>
  )
}

export default App
