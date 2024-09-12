import { Table, TableCaption } from "@/components/ui/table"
import { usePokemonStore } from "@/store/store"
import THeader from "@/components/GuestedPokemonsTable/THeader"
import TBody from "@/components/GuestedPokemonsTable/TBody"
import { useTranslation } from "react-i18next"

export default function GuestedPokemons() {
  const { t } = useTranslation(["play"])
  const turn = usePokemonStore((state) => state.turn)

  return (
    <Table className="w-full px-2 mx-auto max-w-screen-xl md:px-6 my-8">
      <TableCaption>{t("remaining", { turn: 7 - turn })}</TableCaption>
      <THeader />
      <TBody />
    </Table>
  )
}
