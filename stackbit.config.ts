// @ts-ignore
import { defineStackbitConfig } from '@stackbit/sdk'

export default defineStackbitConfig({
  contentSources: [
    {
      type: 'git',
      name: 'content',
      models: [
        {
          name: 'page',
          type: 'page',
          label: 'Página Genérica',
          filePath: 'content/pages/{slug}.json',
          urlPath: '/{slug}',
          fields: [
            {
              name: 'title',
              type: 'string',
              label: 'Título',
              required: true
            },
            {
              name: 'body',
              type: 'markdown',
              label: 'Contenido'
            }
          ]
        }
      ]
    }
  ]
})
