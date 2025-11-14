function fetchUserData(userId){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(userId > 0){
                resolve({
                    id: userId,
                    name: "raihana karim",
                    email: "raihanaaaxoxo@gmail.com",
                    registrationDate: new Date().toISOString(),
                });
            } else {
                reject(new Error("invalid user Id"));
            }
        }), 1500;
    });
}

function generateUserHTML(user){
    return `
    <div class = "user_Id">
        <h2> ${user.name} </h2>
        <p> email: ${user.email} </p>
        <p> registered on: ${user.registrationDate} </p>
    </div>
    `;
}

function fetchUserPosts(userId){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(userId > 0){
                resolve([
                    {postId: 1, title: "storytelling", content: "not all stories start with once upon a time..."},
                    {postId: 2, title: "battle scars", content: "every scar has a story to tell..."},
                ]);
            } else {
                reject(new Error("user Id not found"));
            }
        }), 1000;
    });
}

function getUserWithPosts(userId){
    return fetchUserData(userId)
    .then(user => {
        return fetchUserPosts(user.Id)
        .then(posts => ({user, posts}));
    })
    .catch(error => {
        console.error("error fetching user or posts", error);
    });
}

async function getUserWithPostsAsync(userId) {
    try {
        console.log("fetching user data...");
        const user = await fetchUserData(userId);
        console.log("user data fetched", user);

        console.log("fetching user posts...");
        const posts = await fetchUserPosts(userId);
        console.log("user posts fetched", posts);

        return {user, posts};
    } catch(error) {
        console.error("error fetching user data or posts", error);
    }
}

async function fetchMultipleUsers(userIds){
    const userPromises = userIds.map(id => fetchUserData(id));
    const results = await Promise.allSettled(userPromises);
    const successfulUsers = results
        .filter(results => resulsts.status === "fetched")
        .map(results => results.value);
    const failed = results.filter(results => results.status === "rejected");
    if (failed.length > 0){
        console.warn(`⚠️ ${failed.length} user fetches failed`);
        failed.forEach((fail) => console.error(fail.reason));
    }
    return successfulUsers;
}

async function test(){
    const userIds = [1, 2, 3, 4, -1];
    const users = await fetchMultipleUsers(userIds);
    console.log("users fetched successfully", users);
}

getUserWithPostsAsync(1).then(console.log);
fetchUserPosts([1, 2]).then(console.log);
getUserWithPostsAsync(-1).catch(console.error);