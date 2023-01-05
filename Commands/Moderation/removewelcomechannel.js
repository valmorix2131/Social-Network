const {
  EmbedBuilder,
  PermissionsBitField,
  SlashCommandBuilder,
} = require("discord.js");
const { QuickDB } = require("quick.db");
const { execute } = require("../Developer/reload");
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`removewelchannel`)
    .setDescription(`This disable the welcome message`),
  async execute(interaction) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return await interaction.reply({
        content: "You must have Admin to disable welcome messages",
        ephemeral: true,
      });

    const embed = new EmbedBuilder()
      .setColor("36393f")
      .setDescription(
        `:white_check_mark: Your welcome channel has been removed`
      );

    await db.delete(`welchannel_${interaction.guild.id}`);

    await interaction.reply({ embeds: [embed] });
  },
};
