import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));  

//Array of the character ids that have character names associated with them on the API//
const validCharacterIds = [27, 33, 34, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 55, 57, 58, 59, 61, 62, 65, 75, 76, 83, 90, 91, 93, 97, 98, 101, 105, 109, 110, 128, 129, 136, 137, 142, 143, 144, 154, 155, 157, 160, 161, 165, 168, 169, 170, 178, 192, 195, 197, 207, 209, 226, 231, 235, 236, 239, 244, 253, 255, 256, 257, 259, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 282, 284, 289, 324, 329, 330, 333, 334, 339, 347, 349, 351, 363, 366, 367, 391, 395, 410, 418, 422, 425, 431, 457, 460, 467, 471, 472, 475, 481, 484, 487, 488, 492, 497, 525, 526, 527, 538, 546, 548, 554, 556, 560, 570, 572, 576, 584, 589, 610, 611, 615, 616, 623, 648, 656, 662, 668, 679, 685, 694, 695, 696, 697, 698, 709, 716, 719, 729, 737, 744, 749, 759, 767, 773, 777, 778, 779, 782, 794, 797, 803, 805, 808, 813, 833, 836, 841, 859, 865, 868, 869, 870, 871, 872, 873, 874, 875, 878, 886, 887, 888, 901, 911, 916, 917, 918, 920, 945, 951, 969, 971, 986, 1014, 1023, 1026, 1032, 1034, 1040, 1048, 1050, 1052, 1057, 1070, 1072, 1076, 1077, 1078, 1079, 1099, 1111, 1149, 1169, 1175, 1181, 1202, 1239, 1242, 1286, 1354, 1358, 1375, 1388, 1398, 1399, 1406, 1411, 1417, 1435, 1444, 1458, 1462, 1513, 1514, 1527, 1539, 1545, 1558, 1561, 1589, 1608, 1631, 1650, 1672, 1690, 1718, 1725, 1739, 1746, 1756, 1786, 1862, 1866, 1874, 1884, 1891, 1905, 1908, 1944, 1976, 1989, 2048, 2056, 2059, 2071, 2075, 2138];

//app.get to render webpage, initially without character.//
app.get("/", (req, res) => {
  res.render("index", { characterData: null });
});

//Async function to fetch API and pick random in??
async function generateCharacter() {
  const baseUrl = "https://anapioficeandfire.com/api/characters";

  let character = null;

  // Loop until you get a character with a name
  while (!character) {
    const randomIndex = Math.floor(Math.random() * validCharacterIds.length); // Correctly generate random index
    const characterId = validCharacterIds[randomIndex]; // Use the random index to get a valid character ID

    try {
      const response = await axios.get(`${baseUrl}/${characterId}`);
      if (response.data.name) {
        character = response.data;
        break; // found a valid character
      }
    } catch (error) {
      if (error.response && error.response.status !== 404) {
        console.error("Error fetching character:", error.message);
      }
    }
  }

  if (!character) throw new Error("Failed to fetch character");

  return {
    name: character.name || "Unknown",
    gender: character.gender || "Unknown",
    DOB: character.born || "Unknown",
    died: character.died || "Unknown",
    nicknames: character.aliases.length > 0 ? character.aliases : ["None"]
  };
}

// POST / - Generate new character
app.post("/", async (req, res) => {
  try {
    const characterData = await generateCharacter();
    res.render("index", {
      characterData,
      userFact: null // Clear any old fact
    });
  } catch (error) {
    console.error("Error generating character:", error);
    res.status(500).send("Something went wrong.");
  }
});

//For submitting user fact and sending it back to index.ejs//
app.post("/submit", (req, res) => {
  const userFact = req.body.fact;
//Sends over the current character data so it is not lost when the user submits a fact//
  const characterData = {
    name: req.body.name,
    gender: req.body.gender,
    DOB: req.body.DOB,
    died: req.body.died,
    nicknames: req.body.nicknames ? req.body.nicknames.split(",") : ["None"]
  };

  res.render("index.ejs", {
    characterData,
    userFact
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});