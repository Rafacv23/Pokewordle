import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { TableHeader, TableRow, TableHead } from "@/components/ui/table"
import { Info } from "lucide-react"

export default function THeader() {
  interface Header {
    name: string
    tooltip?: string
  }

  const headers: Header[] = [
    {
      name: "Sprite",
    },
    {
      name: "Pokemon",
    },
    {
      name: "Generation",
    },
    {
      name: "Types",
      tooltip: "Types of the Pokémon. If it has two, both will be shown.",
    },
    {
      name: "Height",
      tooltip: "Height comparison with the selected Pokémon.",
    },
    {
      name: "Weight",
      tooltip: "Weight comparison with the selected Pokémon.",
    },
    {
      name: "Evos",
      tooltip: "Evolution status of the Pokémon.",
    },
  ]

  return (
    <TableHeader>
      <TableRow>
        {headers.map((header) =>
          header.tooltip ? (
            <TableHead>
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
            <TableHead>{header.name}</TableHead>
          )
        )}
      </TableRow>
    </TableHeader>
  )
}
