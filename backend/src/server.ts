import { createApp } from './app.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4310;

createApp().listen(PORT, '127.0.0.1', () => {
  console.log(`Serveur backend circuit-pj à l'écoute sur http://127.0.0.1:${PORT}`);
});
