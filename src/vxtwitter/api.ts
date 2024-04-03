import axios, { AxiosError } from "axios";
import { VxTwitter } from "./vxtwitter";

interface VxTwitterApiResult {
  data?: VxTwitter;
  isError: boolean;
}

export class VxTwitterApi {
  async getPostInformation(url: string): Promise<VxTwitterApiResult> {
    let res;
    try {
      res = await axios.get(url);
      if (res.status !== 200) throw new AxiosError("Error: " + res.status);
    } catch (e) {
      console.error(e);
      return {
        isError: true,
      };
    }
    return {
      data: res.data,
      isError: false,
    };
  }
}
