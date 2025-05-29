const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');
const { discordToken, expressApiUrl } = require('../config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once('ready', () => {
  console.log(`Bot conectado como ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith('/buscar')) {
    const query = message.content.replace('/buscar', '').trim();
    if (!query) return message.reply('Debes escribir algo después de `/buscar`');

    try {
      const { data } = await axios.post(`${expressApiUrl}/api/vector-search`, { query });
      message.reply(`🔎 Resultado:\n${data.resultado || 'Sin resultados.'}`);
    } catch (err) {
      console.error(err.message);
      message.reply('Error al consultar la API.');
    }
  }
});

function startBot() {
  client.login(discordToken);
}

module.exports = startBot;
