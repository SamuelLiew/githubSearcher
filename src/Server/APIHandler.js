import axios from "axios";

const headers = {
    Authorization: 'Token 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'
}
// "curl -i -H "Authorization: token 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"  https://api.github.com/users/octocat"

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

    async starsHandler(updateProfile, userName, pageNumber) {
        try {
            const resp = await axios.get(
                `https://api.github.com/users/${userName}/starred?per_page=100&page=${pageNumber}`,
                {
                    headers: headers,
                }
            );
            console.log(resp)
            updateProfile([userName, "Stars", resp["data"]]);
            return resp['data'];
        } catch (err) {
            console.log(err);
        }
    }

    async repositoryHandler(updateProfile, userName, pageNumber) {
        try {
            const resp = await axios.get(
                `https://api.github.com/users/${userName}/repos?per_page=100&page=${pageNumber}`,
                {
                    headers: headers,
                }
            );
            updateProfile([userName, "Repositories", resp["data"]]);
            return resp['data'];
        } catch (err) {
            console.log(err);
        }
    }

    async followingHandler(updateProfile, userName, pageNumber) {
        try {
            const resp = await axios.get(
                `https://api.github.com/users/${userName}/following?per_page=100&page=${pageNumber}`,
                {
                    headers: headers,
                }
            );
            updateProfile([userName, "Following", resp["data"]]);
            return resp['data'];
        } catch (err) {
            console.log(err);
        }
    }

    async followersHandler(updateProfile, userName, pageNumber) {
        try {
            const resp = await axios.get(
                `https://api.github.com/users/${userName}/followers?per_page=100&page=${pageNumber}`, {
                    headers: headers,
                }
            );
            updateProfile([userName, "Followers", resp["data"]]);
            return resp['data'];
        } catch (err) {
            console.log(err);
        }
    }

    async addHandler(data, onSubmit, userName, caller) {
        try {
            const resp = await axios.get(`https://api.github.com/users/${userName}`, {
                headers: headers
            });
            const alreadyExists = data[resp["data"]["login"]] !== undefined;
            if (!alreadyExists) {
                onSubmit(resp["data"], caller);
            } else {
                console.log("Username is in the list.");
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
