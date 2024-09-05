import { usePokemonStore } from "@/store/store"
import { Button } from "@/components/ui/button"
import { Code2, GithubIcon } from "lucide-react"
import { githubUrl } from "@/site/config"
import { useTranslation } from "react-i18next"

export default function Start() {
  const { t } = useTranslation(["home"])

  const getAllPokemons = usePokemonStore((state) => state.getAllPokemons)

  const handleClick = () => {
    getAllPokemons()
  }
  return (
    <div className="flex gap-4 px-2">
      <Button className="max-w-fit" size={"lg"} onClick={handleClick}>
        {t("play-btn")} <Code2 size={20} className="ml-2" />
      </Button>
      <Button asChild className="max-w-fit" size={"lg"} variant={"outline"}>
        <a href={githubUrl} target="_blank" rel="noreferrer">
          Github <GithubIcon size={20} className="ml-2" />
        </a>
      </Button>
    </div>
  )
}
