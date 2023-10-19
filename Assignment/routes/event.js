var express = require('express');
var router = express.Router();

const { connectToDB, ObjectId } = require('../utils/db');
const { Db } = require('mongodb');

router.get('/', async function (req, res, next) {

  let result = await db.collection("events");
});


router.get('/detail/:id', async function (req, res, next) {
  const db = await connectToDB();
  try {
    let result = await db.collection("events").findOne({ _id: new ObjectId(req.params.id) });
    if (result) {
      res.render('detail', { event: result });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});

router.post('/edit/:id', async function (req, res, next) {
  const db = await connectToDB();
  try {
    req.body.quota = parseInt(req.body.quota);
    req.body.terms = req.body.terms == "on";
    req.body.modifiedAt = new Date();

    let result = await db.collection("events").updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

    if (result.modifiedCount > 0) {
      res.redirect('/event');
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});

router.get('/edit/:id', async function (req, res, next) {
  const db = await connectToDB();
  try {
    let result = await db.collection("events").findOne({ _id: new ObjectId(req.params.id) });
    if (result) {
      res.render('edit', { event: result });
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});

router.get('/new', function (req, res, next) {
  try {
    res.render('new');
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
  }
});

router.post('/delete/:id', async function (req, res, next) {
  const db = await connectToDB();
  try {
    let result = await db.collection("events").deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount > 0) {
      res.redirect('/event');
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});

router.post('/new', async function (req, res, next) {
  const db = await connectToDB();
  try {
    req.body.quota = parseInt(req.body.quota);
    req.body.highlight = req.body.highlight == "on";
    req.body.createdAt = new Date();
    req.body.modifiedAt = new Date();

    let result = await db.collection("events").insertOne(req.body);
    res.status(200).redirect('/event');
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});

module.exports = router;