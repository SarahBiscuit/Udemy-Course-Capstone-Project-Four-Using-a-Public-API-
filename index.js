import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));  

//app.get to render webpage and pull in the api details.//

//app.post to pull in the user form input and send it to the index.ejs file so that it can display on the screen//
//When a user presses the generate new character button, I need their form post to clear as well.//

app.listen(3000, () => {
    console.log("Server running on port 3000.");
    });