import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));  

//app.get to render webpage and send the relevant API details to the index.ejs file.//
app.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://anapioficeandfire.com/api/characters/");

        // Pick a random character from the list of URLs
    const characters = response.data;
    const randomUrl = characters[Math.floor(Math.random() * characters.length)];

    // Fetch detailed data for the selected random character
    const character = await axios.get(randomUrl);

    // Render the data to the view
    res.render("index.ejs", {
      name: character.data.name,
      gender: character.data.gender,
      DOB: character.data.born,
      died: character.data.died,
      nicknames: character.data.aliases
    });

} catch (error) {
    console.error("API fetch failed:", error.message);
    res.status(500).send("Something went wrong.");
  }
});

//app.post to pull in the user form input and send it to the index.ejs file so that it can display on the screen//
//When a user presses the generate new character button, I need their form post to clear as well.//

app.listen(3000, () => {
    console.log("Server running on port 3000.");
    });