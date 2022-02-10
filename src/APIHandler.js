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
    async followingHandler(followingList, updateProfile, userName, pageNumber) {
        try {
            let alreadyExists;

            console.log(
                `https://api.github.com/users/${userName}/following?per_page=100&page=${pageNumber}`
            );
            const resp = await axios.get(
                `https://api.github.com/users/${userName}/following?per_page=100&page=${pageNumber}`
            );
            console.log(resp['data'])
            alreadyExists = followingList[0] !== undefined;
            if (!alreadyExists) {
                //loginName, titleToBeUpdated, theData
                updateProfile([userName, "Following", resp["data"]]);
            } else {
                console.log("Bruh");
            }
            console.log(resp['data'])
            return resp['data'];
        } catch (err) {
            console.log(err);
        }
    }

    async followersHandler(followersList, updateProfile, userName, pageNumber) {
        try {
            let alreadyExists;

            console.log(
                `https://api.github.com/users/${userName}/followers?per_page=100&page=${pageNumber}`
            );
            const resp = await axios.get(
                `https://api.github.com/users/${userName}/followers?per_page=100&page=${pageNumber}`
            );
            console.log(resp['data'])
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

    async addHandler(data, onSubmit, userName, alreadyExists) {
        try {
            const resp = await axios.get(`https://api.github.com/users/${userName}`);
            alreadyExists = data[resp["data"]["login"]] !== undefined;
            if (!alreadyExists) {
                onSubmit(resp["data"]);
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
