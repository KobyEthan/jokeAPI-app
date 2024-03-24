import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", async (req,res) => {
  try{
     const response = await axios.get("curl -X GET /path/to/api/v1/jobs")
     const result = response.data;
     console.log(result);
     res.render("index.ejs", { data: result});
  } catch (error){
     console.log("Failed to make request: ", error.message);
     res.render("index.ejs", {
        error: error.message,
     });
  }
});

app.post("/", async (req, res) => {
try {
   console.log(req.body);

} catch (error) {
        
}

});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });