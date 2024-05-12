import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit"
    );
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { joke: result });
  } catch (error) {
    console.log("Failed to make request: ", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/get-custom-joke", async (req, res) => {
  try {
    const category = req.body.category;
    const flags = req.body.flags || []; // Ensuring flags is an array even if none selected
    if (category) {
      const response = await axios.get(
        `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=${flags}`
      );
      const result = response.data;
      console.log(result);
      res.render("index.ejs", { joke: result });
    } else {
      try {
        const response = await axios.get(
          `https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`
        );
        const result = response.data;
        const error =
          "You did not select a category, displaying a joke in any category: ";
        console.log(result);
        res.render("index.ejs", { joke: result, error: error });
      } catch (error) {
        console.log("Failed to get any joke: ", error.message);
        res.status(500).send("Failed to get any joke");
      }
    }
  } catch (error) {
    console.log("Failed to get custom joke: ", error.message);
    res.status(500).send("Failed to get custom joke");
  }
});

app.post("/get-any-joke", async (req, res) => {
  try {
    const response = await axios.get(
      `https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`
    );
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { joke: result });
  } catch (error) {
    console.log("Failed to get any joke: ", error.message);
    res.status(500).send("Failed to get any joke");
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server running on port ${port}`);
});
