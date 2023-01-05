const {
  PermissionsBitField,
  EmbedBuilder,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("lock")
    .setDescription("Locks down the specified channel.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want to lock down.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason you locked down the channel.")
    ),
  async execute(interaction, client) {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)
    )
      return await interaction.reply({
        content: "You must be a moderator to use the lockdown command.",
        ephemeral: true,
      });
    const channel = interaction.options.getChannel("channel");
    const reason = interaction.options.getString("reason");

    const embed = new EmbedBuilder()
      .setColor("36393f")
      .setDescription(
        `${channel} has been locked down | Reason: **${reason}**`
      );
    channel.permissionOverwrites.create(channel.guild.roles.everyone, {
      SendMessages: false,
    });

    await interaction.reply({ embeds: [embed] });
  },
};
