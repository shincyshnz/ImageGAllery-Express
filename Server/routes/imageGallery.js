const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { checkAuth } = require("../middlewares/checkAuth");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //specify the directory where you want to store uploaded file
        cb(null, "public/images");
    },
    filename: function (req, file, cb) {
        // Generate a unique name for the uploaded file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = file.originalname.split(".").pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
    }
});
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
    //read images folder
    const filePath = path.join(process.cwd(), 'public/images');

    fs.readdir(filePath, (err, files) => {
        if (err) {
            throw err;
        };
        res.status(200).json(files);
    })

    // const file = path.join(process.cwd(), 'public');
    // const stringified = fs.readdirSync(file + '/images', 'utf8');
    // return res.status(200).json(stringified);

});

// Specific middleware
router.post("/upload", upload.array("upload-files", 12), [checkAuth], (req, res) => {
    if (req.files.length > 0) {
        const files = req.files.map((file) => {
            return file.filename
        });
        res.status(200).json(files);
    }
});


module.exports = router;