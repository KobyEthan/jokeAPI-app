import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`https://devitjobs.com/api/jobsLight`);
    const result = response.data;
    console.log(result);
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.log("Failed to make request: ", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    res.send("Received POST request");
  } catch (error) {
    console.log("Error handling POST request:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
