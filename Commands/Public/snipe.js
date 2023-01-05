const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  Embed,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("snipe")
    .setDescription(`This is a snipe command`),
  async execute(interaction, client) {
    const msg = client.snipes.get(interaction.channel.id);
    if (!msg)
      return await interaction.reply({
        content: "Cant find any deleted messages :((",
        ephemeral: true,
      });

    const ID = msg.author.id;
    const member = interaction.guild.members.cache.get(ID);
    const URL = member.displayAvatarURL();

    const embed = new EmbedBuilder()
      .setColor("Blue")
      .setTitle(`Sniped! (${member.user.tag})`)
      .setDescription(`${msg.content}`)
      .setTimestamp()
      .setFooter({ text: `Member ID: ${ID}`, iconURL: `${URL}` });

    if (msg.image) embed.setImage(msg.image);
    await interaction.reply({ embeds: [embed] });
  },
};
