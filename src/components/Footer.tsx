import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "lucide-react"
import { githubUrl, linkedinUrl } from "@/site/config"

export default function Footer() {
  return (
    <footer className="grid place-content-center">
      <div className="space-x-4 mb-4">
        <Button asChild className="max-w-fit" size={"lg"} variant={"outline"}>
          <a href={linkedinUrl} target="_blank" rel="noreferrer">
            <LinkedinIcon size={20} />
          </a>
        </Button>
        <Button asChild className="max-w-fit" size={"lg"} variant={"outline"}>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            <GithubIcon size={20} />
          </a>
        </Button>
      </div>
      <h2>Created by Rafa Canosa</h2>
    </footer>
  )
}
