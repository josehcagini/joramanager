export default {
  openapi: '3.0.0',
  info: {
    title: 'joramanagerAPI',
    description: ' ',
    contact: {
      email: '',
      name: '',
    },
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://127.0.0.1:8087',
      description: 'Servidor local',
    },
  ],
  paths: {
    '/teste': {
      get: {
        summary: 'rota teste',
        tags: ['teste'],
        responses: {
          200: {
            description: 'teste sucesso',
            content: {
              'application/json': {
                example: [
                  {
                    teste: 'sucesso',
                  },
                ],
              },
            },
          },
        },
      },
    },
  },
};
