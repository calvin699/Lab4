var express = require('express');
var router = express.Router();
const { connectToDB, ObjectId } = require('../utils/db');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

router.post('/volunteer', async function (req, res) {
  const db = await connectToDB();
  console.log(req.body)
  try {
    req.body.terms = req.body.terms == "on";
    req.body.createdAt = new Date();
    req.body.modifiedAt = new Date();

    let result = await db.collection("volunteers").insertOne(req.body);
    // res.status(201).json({ id: result.insertedId });
    res.status(200).redirect('/home');
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});


router.get('/become/volunteer', async function (req, res) {
  try {
    res.render('volunteer');
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
  }
});

router.get('/home', async function (req, res) {
  const db = await connectToDB();
  try {
    await db.collection("events").createIndex({ "$**": 1 });
    let result = await db.collection("events").find().sort({ "createdAt": -1 }).limit(3).toArray();

    res.render('home', { events: result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});

router.get('/event', async function (req, res) {
  const db = await connectToDB();
  try {
    let page = parseInt(req.query.page) || 1;
    let perPage = parseInt(req.query.perPage) || 6;
    let skip = (page - 1) * perPage;
    await db.collection("events").createIndex({ "$**": 1 });
    let result = await db.collection("events").find().sort({ "createdAt": -1 }).skip(skip).limit(perPage).toArray();
    let total = await db.collection("events").countDocuments();

    res.render('event', { events: result, total: total, page: page, perPage: perPage });
  } catch (err) {
    res.status(400).json({ message: err.message });
  } finally {
    await db.client.close();
  }
});