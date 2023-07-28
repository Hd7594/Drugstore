const express = require("express");

const app = express();

app.use(express.json());

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/Drugstore");

const Drug = mongoose.model("Drugs", {
  name: {
    type: String,
    default: "",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

app.post("/drugc", async (req, res) => {
  try {
    const drugExist = await Drug.findOne({
      name: req.body.name,
    });
    if (drugExist === null) {
      const newDrug = new Drug({
        name: req.body.name,
        quantity: req.body.quantity,
      });
      await newDrug.save();
      res.json({ name: req.body.name, quantity: req.body.quantity });
    } else {
      res.json({ message: "Drug already exists" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

app.get("/", async (req, res) => {
  //console.log("drugs list");
  try {
    const allDrugs = await Drug.find();
    res.json(allDrugs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/*
app.post("/drugs/add", async (req, res) => {
  try {
    const drugsAdd = await Drug.findById(req.body.id);
    if (drugsAdd !== null) {
      drugsAdd.quantity = drugsAdd.quantity + req.body.quantity;
      await drugsAdd.save();
      res.json({ message: "quantity added" });
    } else {
      res.json({ message: "bad request" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

*/

/*
app.post("/drugs/add", async (req, res) => {
  try {
    const drugAdd = await Drug.findById(req.body.id);
    if (drugAdd !== null) {
      drugAdd.quantity = drugAdd.quantity + req.body.quantity;
      await drugAdd.save();
      res.json({ message: "quantity added" });
    } else {
      res.json({ message: "Error" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/*
app.post("/drug/add", async (req, res) => {
  try {
    const drugPlus = await Drug.findById(req.body.id);
    if (drugPlus !== null) {
      drugPlus.quantity = drugPlus.quantity + req.body.quantity;
      await drugPlus.save();
      res.json({ message: "qty added" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
*/

app.post("/drug/add", async (req, res) => {
  try {
    const addDrug = await Drug.findById(req.body.id);
    if (addDrug !== null) {
      addDrug.quantity = addDrug.quantity + req.body.quantity;
      await addDrug.save();
      res.json({ message: "qty added" });
    } else {
      res.json({ message: "qty not added" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/*
app.post("/drugs/remove", async (req, res) => {
  try {
    const drug = await Drug.findById(req.body.id);
    if (drug !== null) {
      if (drug.quantity >= req.body.quantity) {
        drug.quantity = drug.quantity - req.body.quantity;
        await drug.save();
        res.json({ message: "Quantity modified" });
        console.log("route Drug");
      } else {
        res.status(400).json({
          message: "Invalid quantity",
        });
      }
    } else {
      res.status(400).json({
        message: "Bad request",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
    console.log("Error:", error.message);
  }
});
*/

/*
app.post("/drugs/remove", async (req, res) => {
  try {
    const drugRemove = await Drug.findById(req.body.id);
    if (drugRemove !== null) {
      drugRemove.quantity = drugRemove.quantity - req.body.quantity;
      await drugRemove.save();
      res.json({ message: "qty modified" });
    } else {
      res.json({ message: "Invalid qty" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});
*/

/*
app.post("/drug/remove", async (req, res) => {
  try {
    const drugsRemove = await Drug.findById(req.body.id);
    if (drugsRemove !== null) {
      drugsRemove.quantity = drugsRemove.quantity - req.body.quantity;
      drugsRemove.save();
      res.json({ message: "qty removed" });
    } else {
      res.json({ message: "qty not removed" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});
*/

app.listen(3000, () => {
  console.log("server launched");
});
