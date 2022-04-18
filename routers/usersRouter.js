const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/users", async (req, res) => {
  try {
    let response = await axios.get(`${process.env.GITHUB_API}/users`);
    if (!response)
      return res
        .status(500)
        .json({ success: false, error: "No users details found" });
    res.status(200).json({ success: true, users: response.data });
  } catch (error) {
    res.status(404).json({ success: false, error: error?.message });
  }
});

router.get("/users/:username", async (req, res) => {
  try {
    let response = await axios.get(
      `${process.env.GITHUB_API}/users/${req.params.username}`
    );
    if (!response)
      return res
        .status(500)
        .json({ success: false, error: "No user details found" });
    res.status(200).json({ success: true, user: response.data });
  } catch (error) {
    res.status(404).json({ success: false, error: error?.message });
  }
});
module.exports = router;
