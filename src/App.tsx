import HeroSection from "@/components/HeroSection"
import ThemeTogglebutton from "@/components/ui/theme-togggle"
import Footer from "@/components/Footer"

function App() {
  return (
    <>
      <div className="fixed top-2 right-6">
        <ThemeTogglebutton />
      </div>
      <HeroSection />
      <Footer />
    </>
  )
}

export default App
