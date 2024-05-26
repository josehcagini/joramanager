import app from './app.js';

const port = process.env.APP_PORT || 8087;
app.listen(port, () => {
  console.log(`escutando na porta ${port}`);
  console.log(`http://localhost:${port}`);
  console.log(`doc api no http://localhost:${port}/api-docs`);
});
