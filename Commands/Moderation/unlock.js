const {
  PermissionsBitField,
  EmbedBuilder,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("Unlocks the specified channel.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("The channel you want to unlock.")
        .setRequired(true)
    ),
  async execute(interaction) {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)
    )
      return await interaction.reply({
        content: "You must be a moderator to use the lockdown command.",
        ephemeral: true,
      });
    const channel = interaction.options.getChannel("channel");

    const embed = new EmbedBuilder()
      .setColor("36393f")
      .setDescription(`${channel} has been unlocked.`);

    channel.permissionOverwrites.create(channel.guild.roles.everyone, {
      SendMessages: true,
    });

    await interaction.reply({ embeds: [embed] });
  },
};
