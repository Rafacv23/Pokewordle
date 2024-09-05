import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon } from "lucide-react"
import { githubUrl, linkedinUrl } from "@/site/config"
import { useTranslation } from "react-i18next"

export default function Footer() {
  const { t } = useTranslation(["footer"])

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
      <h2>{t("created")}</h2>
    </footer>
  )
}
