const {
  EmbedBuilder,
  PermissionsBitField,
  Embed,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Tells The Current Uptime"),
  async execute(interaction, client) {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    const embed = new EmbedBuilder()
      .setColor("36393f")
      .setDescription(
        `\`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds`
      );

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
