const router = require("express").Router();
const Search = require("../models/SearchModel");

router.post("/post", async (req, res) => {
  const { pageTitle, pageUrl } = req.body;

  if (!pageTitle) {
    return res.json({
      error: "Title is required",
    });
  }

  if (!pageUrl) {
    return res.json({
      error: "Url is required",
    });
  }

  const newResult = new Search({
    title: pageTitle,
    url: pageUrl,
  });
  try {
    const savedResult = await newResult.save();
    return res.status(200).json(savedResult);
  } catch (err) {
    res.status(400).json(err);
    console.log("Error while entering new record:", err);
  }
});

router.get("/past7days", async (req, res) => {
  try {
    const count = await Search.find({
      createdAt: {
        $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    }).count();
    return res.status(200).json(count);
  } catch (err) {
    res.status(400).json(err);
    console.log("Error while fetching results:", err);
  }
});
router.get("/past1day", async (req, res) => {
  try {
    const count = await Search.find({
      createdAt: {
        $gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      },
    }).count();
    return res.status(200).json(count);
  } catch (err) {
    res.status(400).json(err);
    console.log("Error while fetching results:", err);
  }
});
router.get("/past1hour", async (req, res) => {
  try {
    const count = await Search.find({
      createdAt: {
        $gte: new Date(new Date().getTime() - 60 * 60 * 1000),
      },
    }).count();
    return res.status(200).json(count);
  } catch (err) {
    res.status(400).json(err);
    console.log("Error while fetching results:", err);
  }
});

module.exports = router;
