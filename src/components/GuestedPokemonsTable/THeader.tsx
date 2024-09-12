import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { TableHeader, TableRow, TableHead } from "@/components/ui/table"
import { Info } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function THeader() {
  const { t } = useTranslation(["play"])
  interface Header {
    name: string
    tooltip?: string
  }

  const headers: Header[] = [
    {
      name: t("headers.sprite"),
    },
    {
      name: t("headers.pokemon"),
    },
    {
      name: t("headers.generation"),
    },
    {
      name: t("headers.types"),
      tooltip: t("headers.types-tooltip"),
    },
    {
      name: t("headers.height"),
      tooltip: t("headers.height-tooltip"),
    },
    {
      name: t("headers.weight"),
      tooltip: t("headers.weight-tooltip"),
    },
    {
      name: t("headers.evos"),
      tooltip: t("headers.evos-tooltip"),
    },
    {
      name: t("headers.rare"),
      tooltip: t("headers.rare-tooltip"),
    },
  ]

  return (
    <TableHeader>
      <TableRow>
        {headers.map((header) =>
          header.tooltip ? (
            <TableHead key={header.name}>
              <TooltipProvider>
                <div className="flex items-center gap-1">
                  {header.name}
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{header.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </TableHead>
          ) : (
            <TableHead key={header.name}>{header.name}</TableHead>
          )
        )}
      </TableRow>
    </TableHeader>
  )
}
