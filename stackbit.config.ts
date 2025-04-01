import { defineStackbitConfig } from '@stackbit/sdk'

export default defineStackbitConfig({
  contentSources: [
    {
      type: 'git',
      name: 'content',
      models: [
        {
          name: 'home',
          label: 'Página de Inicio',
          urlPath: '/',
          file: 'content/pages/home.json',
          fields: [
            { name: 'title', type: 'string', label: 'Título' },
            { name: 'body', type: 'markdown', label: 'Contenido" }
          ]
        }
      ]
    }
  ]
})
