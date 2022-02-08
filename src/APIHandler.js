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
  Hireable: "hireable",
  Location: "location",
  Name: "name",
  Repos: "public_repos",
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

  async formHandler(data, onSubmit, userName, alreadyExists) {
    try {
      const resp = await axios.get(`https://api.github.com/users/${userName}`);
      //alreadyExists = data[resp['data']['login']] === undefined;
      for (let i of data) {
        i["login"] === resp["data"]["login"]
          ? (alreadyExists = true)
          : (alreadyExists = false);

        if (alreadyExists) {
          console.log("Name Already Exists");
          break;
        }
      }

      if (!alreadyExists) {
        onSubmit(resp["data"]);
      }
    } catch (err) {
      // console.log(err);
      // alert("Name Doesn't Exist");
    }
  }

  getAPICounterPart(title) {
    return titleAPINamePair[title];
  }
}

export default APIHandler;
