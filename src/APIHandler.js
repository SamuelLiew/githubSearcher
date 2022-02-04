import axios from "axios";

class APIHandler {
  async updateFollowersObject(personObject) {
    const followersObject = await axios.get(personObject["followers_url"]);
    personObject["followers_url"] = followersObject["data"];
  }

  async getUpdatedObject(personObject) {
    this.updateFollowersObject(personObject);
    return personObject;
  }
}

export default APIHandler;
