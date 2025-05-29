const { Client, GatewayIntentBits, AttachmentBuilder } = require('discord.js');
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
      const { data } = await axios.post(`${expressApiUrl}/consultar/`, { query });
      const metadatas = data?.resultados?.metadatas?.[0];

      if (!metadatas || metadatas.length === 0) {
        return message.reply('Sin resultados.');
      }

      const textos = metadatas.map((meta, index) => `🔹 ${index + 1}. ${meta.text}`).join('\n\n');

      if (textos.length > 2000) {
        const buffer = Buffer.from(textos, 'utf-8');
        const file = new AttachmentBuilder(buffer, { name: 'resultados.txt' });

        await message.reply({
          content: '📄 El resultado es muy largo, te lo envío como archivo:',
          files: [file],
        });
      } else {
        await message.reply(`🔎 Resultados:\n${textos}`);
      }

      console.log(`resultado enviado a Discord: ${textos}`);
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
