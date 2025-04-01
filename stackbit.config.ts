export default {
  contentSources: [
    {
      name: 'content',
      type: 'git',
      models: [
        {
          name: 'home',
          label: 'Página de Inicio',
          file: 'content/pages/home.json',
          urlPath: '/',
          fields: [
            { name: 'title', label: 'Título', type: 'string' },
            { name: 'body', label: 'Contenido', type: 'markdown' }
          ]
        }
      ]
    }
  ]
}
