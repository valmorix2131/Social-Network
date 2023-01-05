const {
  EmbedBuilder,
  PermissionsBitField,
  SlashCommandBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("This command will time users out for a specific time.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member you'd like to kick.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription(
          "The amount of minutes you'd like to time out the member for."
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for kicking the specified member.")
    ),

  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    let reason = interaction.options.getString("reason");
    const time = interaction.options.getInteger("time");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch((err) => {
        return;
      });

    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    )
      return await interaction.reply({
        content: `You don't have the required permissions to use this command`,
        ephemeral: true,
      });
    if (!member)
      return await interaction.reply({
        content: "The user mentioned is no longer in the server!",
        ephemeral: true,
      });
    if (!member.kickable)
      return await interaction.reply({
        content:
          "I cannot timeout this user as they have roles higher than me or you!",
        ephemeral: true,
      });

    if (!reason) reason = "No reason provided.";

    await member.timeout(time * 60 * 1000, reason);

    const embed = new EmbedBuilder()
      .setColor("36393f")
      .setDescription(
        `:white_check_mark: Timed out ${user.tag} for ${time} minute(s).`
      );

    await interaction.reply({ embeds: [embed] });
  },
};
