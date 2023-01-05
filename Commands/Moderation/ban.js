const {
  EmbedBuilder,
  PermissionsBitField,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("This command bans members from the server")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user you would like to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for banning the user")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const banUser = interaction.options.getUser("target");
    const banMember = await interaction.guild.members.fetch(banUser.id);
    const channel = interaction.channel;

    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)
    )
      return await interaction.reply({
        content: `:x: You don't have the required permissions to use this command`,
        ephemeral: true,
      });
    if (!banMember)
      return await interaction.reply({
        content: "The user mentioned is no longer in the server!",
        ephemeral: true,
      });
    if (!banMember.kickable)
      return await interaction.reply({
        content:
          "I cannot kick this user as they have roles higher than me or you!",
        ephemeral: true,
      });

    let reason = interaction.options.getString("reason");
    if (!reason) reason = "No reason given.";

    const dmEmbed = new EmbedBuilder()
      .setColor("36393f")
      .setDescription(
        `You have been banned from **${interaction.guild.name}** | Reason: ${reason}`
      )
      .setTimestamp();

    const embed = new EmbedBuilder()
      .setColor("36393f")
      .setDescription(`${banUser.tag} has been **banned** | Reason: ${reason}`)
      .setTimestamp();

    await banMember.send({ embeds: [dmEmbed] }).catch((err) => {
      return;
    });

    await banMember.ban({ reason: reason }).catch((err) => {
      interaction.reply({ content: "There was an error!", ephemeral: true });
    });

    await interaction.reply({ embeds: [embed] });
  },
};
