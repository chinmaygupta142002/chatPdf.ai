const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyAY68iV0PPxCE_OUIBl8R978pJZbIrL-jY");

async function run(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
}
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.post("/", async function(req, res){
    const response = await run(req.body.prompt);
    res.send(response);
})

app.listen(5000, (req, res) =>{
    console.log("Server Running on Port 5000");
})