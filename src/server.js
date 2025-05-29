const app = require('./app');
const { port } = require('./config');
const startBot = require('./services/discordService');

app.listen(port, () => {
  console.log(`🌐 Servidor Express del bot escuchando en puerto ${port}`);
  startBot();
});
