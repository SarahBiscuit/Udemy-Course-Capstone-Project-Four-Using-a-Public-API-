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
        const randomId = Math.floor(Math.random() * 2138) + 1;
        const response = await axios.get(`https://anapioficeandfire.com/api/characters/${randomId}`);

        const character = response.data;

        res.render("index.ejs", {
            name: character.name || " ",
            gender: character.gender || " ",
            DOB: character.born || " ",
            died: character.died || " ",
            nicknames: character.aliases.length > 0 ? character.aliases : ["None"]
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