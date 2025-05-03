import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));  

//app.get to render webpage, initially wihtout character.//
app.get("/", (req, res) => {
  res.render("index.ejs", {characterData: null}); 
});

async function generateCharacter() {
  const baseUrl = "https://anapioficeandfire.com/api/characters";

  //Works out total number of characters in the API//
  const countRes = await axios.get(`${baseUrl}?page=1&pageSize=1`);
  const totalIds = parseInt(countRes.headers["x-total-count"], 10);

  let character = null;

  // Loop until you get a character with a name //
  while (!character || !character.name) {
    const randomCharacter = Math.floor(Math.random() * totalIds) + 1;
    const response = await axios.get(`${baseUrl}/${randomCharacter}`);
    character = response.data;
}

//Returns a character//
return {
  name: character.name || "Unknown",
  gender: character.gender || "Unknown",
  DOB: character.born || "Unknown",
  died: character.died || "Unknown",
  nicknames: character.aliases.length > 0 ? character.aliases : ["None"]
};
}

app.post("/", async (req, res) => {
  try {
      const characterData = await generateCharacter();
      res.render("index.ejs", { characterData });
  } catch (error) {
      console.error("API fetch failed:", error.message);
      res.status(500).send("Error in fetching API.");
  }
});

//app.post to pull in the user form input and send it to the index.ejs file so that it can display on the screen//
//When a user presses the generate new character button, I need their form post to clear as well.//

app.listen(3000, () => {
    console.log("Server running on port 3000.");
    });