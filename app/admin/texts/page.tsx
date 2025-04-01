"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Plus, Search } from "lucide-react"

// Datos de ejemplo para los textos
const TEXTS_DATA = [
  {
    id: 1,
    key: "home.hero.title",
    value: "Silver Street Jewelry",
    description: "Título principal de la página de inicio",
    updatedAt: "2023-11-15",
  },
  // Más textos...
]

export default function TextsAdmin() {
  const [searchTerm, setSearchTerm] = useState("")
  const [texts, setTexts] = useState(TEXTS_DATA)
  const [editingText, setEditingText] = useState<any>(null)

  // Filtrar textos según el término de búsqueda
  const filteredTexts = texts.filter(
    (text) =>
      text.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      text.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
      text.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSaveText = () => {
    if (editingText) {
      setTexts(
        texts.map((text) =>
          text.id === editingText.id
            ? { ...text, value: editingText.value, updatedAt: new Date().toISOString().split("T")[0] }
            : text,
        ),
      )
      setEditingText(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Textos del sitio</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo texto
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Buscar textos..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Clave</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Última actualización</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTexts.map((text) => (
                <TableRow key={text.id}>
                  <TableCell className="font-medium">{text.key}</TableCell>
                  <TableCell className="max-w-xs truncate">{text.value}</TableCell>
                  <TableCell>{text.description}</TableCell>
                  <TableCell>{text.updatedAt}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setEditingText(text)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      </DialogTrigger>
                      <DialogContent>{/* Contenido del diálogo... */}</DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

