import axios from "axios";
// FUTURE IDEA: Implement OAuth.
const headers = {
    // Authorization: 'Token '
};

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
            updateProfile([userName, "Stars", resp["data"]]);
            return resp["data"];
        } catch (err) {
            alert("Limit Reached.")
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
            return resp["data"];
        } catch (err) {
            alert("Limit Reached.")
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
            return resp["data"];
        } catch (err) {
            alert("Limit Reached.")
        }
    }

    async followersHandler(updateProfile, userName, pageNumber) {
        try {
            const resp = await axios.get(
                `https://api.github.com/users/${userName}/followers?per_page=100&page=${pageNumber}`,
                {
                    headers: headers,
                }
            );
            updateProfile([userName, "Followers", resp["data"]]);
            return resp["data"];
        } catch (err) {
            alert("Limit Reached.")
        }
    }

    async addHandler(data, onSubmit, userName, caller) {
        try {
            const resp = await axios.get(`https://api.github.com/users/${userName}`, {
                headers: headers,
            });
            const alreadyExists = data[resp["data"]["login"]] !== undefined;
            if (!alreadyExists) {
                onSubmit(resp["data"], caller);
            } else {
                alert("Username's already in the list.");
            }
        } catch (err) {
            if (err.response.status === 404) {
                alert("Name Doesn't Exist.")
            } else if (err.response.status === 403) {
                alert("Limit Reached.")
            } else {
                console.log(err)
            }

        }
    }

    getAPICounterPart(title) {
        return titleAPINamePair[title];
    }

    async getRateLimit() {
        try {
            const resp = await axios.get('https://api.github.com/rate_limit', {
                headers: headers,
            })
            return resp['data']['rate']['remaining']
        } catch (err) {
            console.log(err)
        }
    }
}

export default APIHandler;
