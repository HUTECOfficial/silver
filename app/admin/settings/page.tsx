"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save } from "lucide-react"

export default function SettingsAdmin() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Silver Street Jewelry",
    siteDescription: "Timeless elegance in everyday jewelry",
    contactEmail: "sales@silverstreetjewelry.com",
    contactPhone: "(954) 525-0073",
    address: "Fort Lauderdale, FL",
    enableMaintenanceMode: false,
  })

  const [seoSettings, setSeoSettings] = useState({
    defaultTitle: "Silver Street Jewelry | Timeless elegance in everyday jewelry",
    defaultDescription:
      "Silver Street Jewelry offers timeless and unique jewelry pieces that blend classic elegance with modern versatility.",
    defaultKeywords: "jewelry, silver, rings, sphere rings, necklaces, earrings, pendants",
    googleAnalyticsId: "UA-XXXXXXXXX-X",
    enableSitemap: true,
  })

  const [socialSettings, setSocialSettings] = useState({
    facebookUrl: "https://facebook.com/silverstreetjewelry",
    instagramUrl: "https://instagram.com/silverstreetjewelry",
    twitterUrl: "https://twitter.com/silverstreetjewelry",
    pinterestUrl: "",
    youtubeUrl: "",
  })

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings({
      ...generalSettings,
      [name]: value,
    })
  }

  const handleSeoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSeoSettings({
      ...seoSettings,
      [name]: value,
    })
  }

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSocialSettings({
      ...socialSettings,
      [name]: value,
    })
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    if (name === "enableMaintenanceMode") {
      setGeneralSettings({
        ...generalSettings,
        enableMaintenanceMode: checked,
      })
    } else if (name === "enableSitemap") {
      setSeoSettings({
        ...seoSettings,
        enableSitemap: checked,
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Configuración</h1>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Guardar cambios
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="social">Redes Sociales</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración General</CardTitle>
              <CardDescription>Configura los ajustes básicos de tu sitio web.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">{/* Contenido de configuración general... */}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración SEO</CardTitle>
              <CardDescription>Optimiza tu sitio para los motores de búsqueda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">{/* Contenido de configuración SEO... */}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociales</CardTitle>
              <CardDescription>Configura los enlaces a tus perfiles de redes sociales.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">{/* Contenido de configuración de redes sociales... */}</CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

