import Start from "@/components/Start"
import { useTranslation } from "react-i18next"
import SelectGeneration from "@/components/SelectGeneration"

export default function HeroSection() {
  const { t } = useTranslation(["home"])

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="w-full px-2 mx-auto max-w-screen-xl md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <img
                src="../logo.png"
                width={120}
                height={120}
                alt="Pokewordle logo"
              />
              <h1 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground/70">
                PokeWordle
              </h1>
              <p className="text-muted-foreground  mx-auto">{t("subtitle")}</p>
            </div>
            <Start />
            <SelectGeneration />
          </div>
        </div>
      </div>
    </section>
  )
}
