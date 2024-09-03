import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function GuestedPokemons() {
  return (
    <Table className="w-full px-2 mx-auto max-w-screen-xl md:px-6">
      <TableCaption>A list of your recent Pokemon.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Sprite</TableHead>
          <TableHead>Pokemon</TableHead>
          <TableHead>Gen</TableHead>
          <TableHead className="text-right">Evo</TableHead>
        </TableRow>
      </TableHeader>
      {/* <TableBody>
        {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
            </TableRow>
            ))}
            </TableBody> */}
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
