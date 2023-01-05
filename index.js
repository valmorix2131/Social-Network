const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  Events,
} = require("discord.js");
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
  intents: [Guilds, GuildMembers, GuildMessages],
  partials: [User, Message, GuildMember, ThreadMember],
});

const { loadEvents } = require("./Handlers/eventHandler");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();

const { connect } = require("mongoose");
connect(client.config.DatabaseURL, {}).then(() =>
  console.log("The client is now connect to the database.")
);

//welcome command
client.on(Events.GuildMemberAdd, async (member) => {
  const channelID = await db.get(`welchannel_${member.guild.id}`);
  const channel = member.guild.channels.cache.get(channelID);
  const message = `Welcome to the **Social Network!** ${member}, We're happy to have you here.`;

  if (channelID == null) return;

  channel.send(message);
});

//snipe command
client.snipes = new Map();
client.on("messageDelete", function (message, channel) {
  client.snipes.set(message.channel.id, {
    content: message.content,
    author: message.author,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null,
  });
});

loadEvents(client);

client.login(client.config.token);
