const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send({response: "hear me respondoar"}).status(200);
});

module.exports = router;