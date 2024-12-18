const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.static(__dirname+"/app"))
const port = 3000;

// Define the folder path
const folderPath = path.join(__dirname,"app", 'files');

// Route to handle GET request for files
app.get('/getFiles', (req, res) => {
    // Read all files in the folder
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading the folder:', err);
            return res.status(500).json({ error: 'Could not read files' });
        }
        // Filter only files (excluding directories)
        const fileArray = files.filter(file => fs.lstatSync(path.join(folderPath, file)).isFile());
        res.json({ files: fileArray }); // Send the array as JSON response
    });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
