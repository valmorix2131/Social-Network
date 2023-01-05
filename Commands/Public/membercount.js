const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("membercount")
    .setDescription("Displays the amount of members in the server!"),

  async execute(interaction) {
    const membercount = interaction.guild.memberCount;

    const embed = new EmbedBuilder()
      .setColor("36393f")
      .setDescription(`Total Members: ${membercount}`);

    await interaction.reply({ embeds: [embed] });
  },
};
