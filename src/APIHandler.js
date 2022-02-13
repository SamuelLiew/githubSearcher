import axios from "axios";

const headers = {}
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
    async followingHandler(followingList, updateProfile, userName, pageNumber) {
        try {
            let alreadyExists;
            const resp = await axios.get(
                `https://api.github.com/users/${userName}/following?per_page=100&page=${pageNumber}`,
                {
                    headers: headers,
                }
            );
            alreadyExists = followingList[0] !== undefined;
            if (!alreadyExists) {
                updateProfile([userName, "Following", resp["data"]]);
            } else {
                console.log("Bruh");
            }
            return resp['data'];
        } catch (err) {
            console.log(err);
        }
    }

    async followersHandler(followersList, updateProfile, userName, pageNumber) {
        try {
            let alreadyExists;
            const resp = await axios.get(
                `https://api.github.com/users/${userName}/followers?per_page=100&page=${pageNumber}`, {
                    headers: headers,
                }
            );
            alreadyExists = followersList[0] !== undefined;
            if (!alreadyExists) {
                updateProfile([userName, "Followers", resp["data"]]);
            } else {
                console.log("Bruh");
            }
            return resp['data'];
        } catch (err) {
            console.log(err);
        }
    }

    async addHandler(data, onSubmit, userName, alreadyExists, caller) {
        try {
            // "curl -i -H "Authorization: token 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"  https://api.github.com/users/octocat"
            const resp = await axios.get(`https://api.github.com/users/${userName}`, {
                headers: headers
            });
            alreadyExists = data[resp["data"]["login"]] !== undefined;
            if (!alreadyExists) {
                onSubmit(resp["data"], caller);
            } else {
                console.log("Bruh");
            }
        } catch (err) {
            console.log(err);
            // alert("Name Doesn't Exist");
        }
    }

    getAPICounterPart(title) {
        return titleAPINamePair[title];
    }
}

export default APIHandler;
