const fs = require("fs");

class FSRepository {
  checkFileExists(file) {
    let response;
    try {
      response = fs.existsSync(file);
    } catch (err) {
      response = false;
    }
    return response;
  }

  readDataFromFile(file) {
    let response;
    try {
      const json = fs.readFileSync(file);
      response = JSON.parse(json);
    } catch (err) {
      response = false;
    }
    return response;
  }

  writeDataToFile(file, data) {
    const json = JSON.stringify(data);
    fs.writeFile(file, json, { flag: "w" }, (err) => {
      if (err) {
        console.log(err);
        console.log(`Error Writing File at: ${file}`);
      } else {
        console.log(`${file} Written to Successfully`);
      }
    });
  }
}

module.exports = FSRepository;
