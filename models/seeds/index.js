const connection = require("../../config/connection");
const User = require("../../models/user")
const thought = require("../../models/thought")
connection.on("error", (err) => console.log(err));

connection.once("open", async () => {
    await User.collection.drop()
    await thought.collection.drop()
    await seedData()

    process.exit(0)
})

async function seedData() {
    await User.create({
        username: "JohnDoe",
        email: "hello@world.com",
        friends: []
    })
    await User.create({
        username: "JohnDoe1",
        email: "hello1@world.com",
        friends: []
    })
    await thought.create({
        thoughtText: "Hello World!",
        username: "JohnDoe"
    })
}