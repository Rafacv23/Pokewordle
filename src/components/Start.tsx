import { usePokemonStore } from "@/store/store"
import { Button } from "@/components/ui/button"
import { Code2, GithubIcon } from "lucide-react"
import { githubUrl } from "@/site/config"

export default function Start() {
  const getAllPokemons = usePokemonStore((state) => state.getAllPokemons)

  const handleClick = () => {
    getAllPokemons()
  }
  return (
    <div className="flex gap-4 px-2">
      <Button className="max-w-fit" size={"lg"} onClick={handleClick}>
        Start <Code2 size={20} className="ml-2" />
      </Button>
      <Button asChild className="max-w-fit" size={"lg"} variant={"outline"}>
        <a href={githubUrl} target="_blank" rel="noreferrer">
          Github <GithubIcon size={20} className="ml-2" />
        </a>
      </Button>
    </div>
  )
}
