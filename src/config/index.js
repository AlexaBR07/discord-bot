require('dotenv').config();

module.exports = {
  port: process.env.PORT || 4000,
  discordToken: process.env.DISCORD_TOKEN,
  expressApiUrl: process.env.EXPRESS_API_URL,
};
