const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const methodOverride = require("method-override"); // new
const morgan = require("morgan");
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });
const Dog = require("./model/dog.js");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));


app.get("/", async (req, res) => {
    res.render('index.ejs');
});

app.get("/dogs/new", (req, res) => {
    res.render('dogs/new.ejs')
})

app.post("/dogs", async (req, res) => {
    await Dog.create(req.body)
    res.redirect("/dogs");
});
  
app.get("/dogs", async (req, res) => {
    const allDogs = await Dog.find();
    res.render("dogs/index.ejs", { dogs: allDogs });
});

app.get('/dogs/:dogId', async (req, res) => {
    const chosenDog = await Dog.findById(req.params.dogId)
    res.render('dogs/show.ejs', {dog: chosenDog})
})

app.get('/dogs/:dogId/edit', async function(req, res){
    const dog = await Dog.findById(req.params.dogId)
    res.render('dogs/edit.ejs', {dog: dog})
})

app.put('/dogs/:dogId', async function(req, res){
    const editedDog = await Dog.findByIdAndUpdate(req.params.dogId, req.body)
    res.redirect(`/dogs/${req.params.dogId}`)
})

app.delete('/dogs/:dogId', async function(req, res){
    const deletedDog = await Dog.findByIdAndDelete(req.params.dogId)

    res.redirect('/dogs')
})

app.listen(3000, () => {
  console.log("Listening on port 3000");
});