import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
//1. Use the inquirer npm package to get user input.
inquirer
.prompt([
    {
        message :"Enter the URL",
        name : "URL"
    }
])
.then((answers) => {
  const url = answers.URL;
  var qr_svg = qr.image(url);  //2. Use the qr-image npm package to turn the user entered URL into a QR code image.
  qr_svg.pipe(fs.createWriteStream('qr_image.png'));
  fs.writeFile('message.txt', url, (err) => {   //3. Create a txt file to save the user input using the native fs node module.
    if (err) throw err;
    console.log('The file has been saved!');
  }); 
})
.catch((error) => {
  if (error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
  } else {
    // Something else went wrong
  }
});

