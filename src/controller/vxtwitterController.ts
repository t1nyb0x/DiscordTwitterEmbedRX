import { EmbedBuilder, Message } from "discord.js";
import { PostEmbed } from "../postEmbed";
import { VxTwitterApi } from "../vxtwitter/api";

export class VxTwitterController {
  createVxTwitterEmbedData(message: Message): Promise<EmbedBuilder[] | string> | string {
    // https://twitter.com(or x.com)/hogehoge/{postID}かチェック
    const matchRes = message.content.match(/https:\/\/(x|twitter)\.com\/[A-Za-z_0-9]+\/status\/[0-9]+/g);
    if (matchRes) {
      // /x or /twitterを/api.vxtwitterに置き換え
      const vxApiUrl = matchRes.map((t) => t.replace(/\/(x|twitter)/, "/api.vxtwitter"));
      // let vxUrl: string[];
      let embedPostInfo: EmbedBuilder[];

      vxApiUrl.map(async (url) => {
        const vxtwitterapi = new VxTwitterApi();
        const result = await vxtwitterapi.getPostInformation(url);

        if (result.isError) {
          // vxUrl = vxApiUrl.map((t) => t.replace(/\/api.vxtwitter/, "/vxtwitter"));
          return "failed";
        } else {
          const postEmbed = new PostEmbed();
          if (result.data!.mediaURLs.length > 1) {
            // const embedPostInfo = postEmbed.createMultiImageEmbed(result.data!);
            embedPostInfo = postEmbed.createMultiImageEmbed(result.data!);
            return embedPostInfo;
          } else {
            embedPostInfo.push(postEmbed.createEmbed(result.data!));
            return embedPostInfo;
          }
        }
      });
    }
    return "test";
  }

  // changeToVxUrl(apiUrl: string): string {}

  // createEmbedData(vxData: VxTwitter)
  // {
  //   vxApiUrl.map(async (url) => {
  //     const vxtwitterapi = new VxTwitterApi();
  //     const result = await vxtwitterapi.getPostInformation(url);

  //     if (result.isError) {
  //       const vxUrl = vxApiUrl.map((t) => t.replace(/\/api.vxtwitter/, "/vxtwitter"));
  //       return vxUrl;
  //     } else {
  //       const postEmbed = new PostEmbed();
  //       console.log(result.data!.mediaURLs);
  //       if (result.data!.mediaURLs.length > 1) {
  //         const embedPostInfo = postEmbed.createMultiImageEmbed(result.data!);
  //         return embedPostInfo;
  //       } else {
  //         const embedPostInfo = postEmbed.createEmbed(result.data!);
  //         return [embedPostInfo];
  //       }
  //     }
  //   });
  // }
  // }
}
