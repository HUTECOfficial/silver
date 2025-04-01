// @ts-ignore
import { defineStackbitConfig } from '@stackbit/sdk'

export default defineStackbitConfig({
  stackbitVersion: '~0.6.0', // 👈 NECESARIO para Visual Editor moderno
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
  ],
  modelExtensions: [ // 👈 Le dice al editor que esto es una página editable
    {
      name: 'page',
      type: 'page',
      urlPath: '/{slug}'
    }
  ]
})
