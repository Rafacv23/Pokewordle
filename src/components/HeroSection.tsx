import Start from "./Start"

export default function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="w-full px-2 mx-auto max-w-screen-xl md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <img
                src="/src/assets/logo.png"
                width={120}
                height={120}
                alt="Pokewordle logo"
              />
              <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground/70">
                PokeWordle
              </h1>
              <p className="text-muted-foreground  mx-auto">
                Comes with Lucide, ShadCN UI, theme toggle too! Accelerate your
                development process with this template.
              </p>
            </div>
            <Start />
          </div>
          <img
            alt="Hero"
            className="mx-auto shadow-md overflow-hidden rounded-xl object-cover object-bottom sm:w-full lg:order-last"
            src="https://assets.lummi.ai/assets/QmXkegPybPdekwo72iMg59aBtizgSXtBF1foXBMfqNdr4M?auto=format&w=1500"
          />
        </div>
      </div>
    </section>
  )
}
