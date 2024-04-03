import { Client, Message, GatewayIntentBits } from "discord.js";
import dotenv from "dotenv";
import { VxTwitterController } from "./controller/vxtwitterController";

dotenv.config();
const ENV = process.env.ENVIRONMENT;

let token: string | undefined;

switch (ENV) {
  case "production":
    token = process.env.PRODUCTION_TOKEN;
    break;
  case "develop":
    token = process.env.DEVELOP_TOKEN;
    break;
}

if (token === undefined) throw new Error("Failed load discord token.");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.login(token);

client.on("ready", async () => {
  if (client.user === null) {
    throw new Error("Failed load client");
  }
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (m: Message) => {
  if ((client.user !== null && m.author.id === client.user.id) || m.author.bot) return;

  const vxTwitterController = new VxTwitterController();

  const embedPostInfo = await vxTwitterController.createVxTwitterEmbedData(m);

  if (typeof embedPostInfo === "string") {
    m.channel.send(embedPostInfo);
  } else {
    console.log(embedPostInfo);
    m.channel.send({ embeds: embedPostInfo });
  }
});
