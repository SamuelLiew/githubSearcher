import axios from "axios";
const titleAPINamePair = {
  Bio: "bio",
  Blog: "blog",
  Company: "company",
  Created: "created_at",
  Email: "email",
  Followers: "followers",
  Following: "following",
  Gists: "public_gists",
  Github: "html_url",
  Name: "name",
  Twitter: "twitter_username",
  Type: "type",
  Updated: "updated_at",
};
class APIHandler {
  async updateFollowersObject(personObject) {
    const followersObject = await axios.get(personObject["followers_url"]);
    personObject["followers_url"] = followersObject["data"];
  }

  async getUpdatedObject(personObject) {
    this.updateFollowersObject(personObject);
    return personObject;
  }

  getAPICounterPart(title) {
    return titleAPINamePair[title];
  }
}

export default APIHandler;
