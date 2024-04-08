const express = require("express");
const router = express.Router();
const upload = require("./multer");

router.post("/upload", upload.single("image"), function (req, res, next) {
    if (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Error"
        });
    }

    res.status(200).json({
        success: true,
        message: "Uploaded!",
        data: Result,
    });
});

module.exports = router;