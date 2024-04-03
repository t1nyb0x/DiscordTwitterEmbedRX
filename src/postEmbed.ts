import { EmbedBuilder } from "discord.js";
import { VxTwitter } from "./vxtwitter/vxtwitter";

export class PostEmbed {
  createEmbed(postInfo: VxTwitter): EmbedBuilder {
    const embed = new EmbedBuilder()
      .setAuthor({
        name: postInfo.user_name,
        url: "https://twitter.com/" + postInfo.user_screen_name,
        iconURL: postInfo.user_profile_image_url,
      })
      .setTitle(postInfo.user_name)
      .setURL(postInfo.tweetURL)
      .setDescription(postInfo.text)
      .setColor(9016025)
      .setTimestamp(new Date(postInfo.date))
      .setImage(postInfo.mediaURLs[0]);

    return embed;
  }

  createMultiImageEmbed(postInfo: VxTwitter): EmbedBuilder[] {
    const embeds: EmbedBuilder[] = [];
    postInfo.mediaURLs.map((mediaURL) => {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: postInfo.user_name,
          url: "https://twitter.com/" + postInfo.user_screen_name,
          iconURL: postInfo.user_profile_image_url,
        })
        .setTitle(postInfo.user_name)
        .setURL(postInfo.tweetURL)
        .setDescription(postInfo.text)
        .setColor(9016025)
        .setTimestamp(new Date(postInfo.date))
        .setImage(mediaURL);

      embeds.push(embed);
    });

    return embeds;
  }
}
