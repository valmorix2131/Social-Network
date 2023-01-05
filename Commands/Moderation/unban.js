const {
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
  PermissionFlagsBits,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a banned user from this discord server")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption((option) =>
      option
        .setName("userid")
        .setDescription("discord ID of the user")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    const { channel, options } = interaction;

    const userId = options.getString("userid");

    try {
      await interaction.guild.members.unban(userId);

      const embed = new EmbedBuilder()
        .setDescription(`✅ Unbaned ${userId} from the server.`)
        .setColor("36393f");

      await interaction.reply({
        embeds: [embed],
      });
    } catch (err) {
      console.log(err);

      const errEmbed = new EmbedBuilder()
        .setDescription(`Please provide a valid member ID.`)
        .setColor("36393f");

      interaction.reply({ embeds: [errEmbed], ephemeral: true });
    }
  },
};
