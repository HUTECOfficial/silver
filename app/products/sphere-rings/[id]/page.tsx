import { SphereRingProduct } from "@/components/SphereRingProduct"

// Esta función es necesaria para la exportación estática
export function generateStaticParams() {
  // Genera los IDs para los que se crearán páginas estáticas
  return [{ id: "classic" }, { id: "deluxe" }, { id: "premium" }]
}

export default function SphereRingPage({ params }: { params: { id: string } }) {
  return <SphereRingProduct id={params.id} />
}

