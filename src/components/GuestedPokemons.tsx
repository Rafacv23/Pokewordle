import { Table, TableCaption } from "@/components/ui/table"
import { usePokemonStore } from "@/store/store"
import THeader from "@/components/THeader"
import { TBody } from "@/components/TBody"

export default function GuestedPokemons() {
  const turn = usePokemonStore((state) => state.turn)

  return (
    <Table className="w-full px-2 mx-auto max-w-screen-xl md:px-6">
      <TableCaption>Remaining attempts {5 - turn}</TableCaption>
      <THeader />
      <TBody />
    </Table>
  )
}
