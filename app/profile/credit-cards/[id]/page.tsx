import { CreditCardDetails } from "@/components/CreditCardDetails"

// Esta función es necesaria para la exportación estática
export function generateStaticParams() {
  // Genera los IDs para los que se crearán páginas estáticas
  return [{ id: "1" }, { id: "2" }, { id: "3" }]
}

export default function CreditCardPage({ params }: { params: { id: string } }) {
  return <CreditCardDetails id={params.id} />
}

