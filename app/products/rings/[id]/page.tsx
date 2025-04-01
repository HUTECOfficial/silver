import { SphereRingProduct } from "@/components/SphereRingProduct"

// Esta función es necesaria para la exportación estática
export function generateStaticParams() {
  // Genera los IDs para los que se crearán páginas estáticas
  return [
    { id: "classic" },
    { id: "deluxe" },
    { id: "premium" },
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
  ]
}

export default function RingProduct({ params }: { params: { id: string } }) {
  return <SphereRingProduct id={params.id} />
}

