const csvToJson = require("convert-csv-to-json")
const path = require("path")
const fs = require("fs")
const crypto = require("crypto")
const generate = require("csv-generate")

// => Convert CSV to JSON
let inputFile = "hngi9_csv_file.csv"
let outputFile = "outputFile.json"

// csvToJson.generateJsonFileFromCsv(inputFile,outputFile);

// => Iterate over JSON
let jsonObj = csvToJson.getJsonFromCsv("hngi9_csv_file.csv")
let teamName

for (let i=0; i < jsonObj.length; i++) {
  let headerInfo = Object.keys(jsonObj[i])[0].split(",")
  let fields = Object.values(jsonObj[i])[0].split(",")
  teamName = fields[0] ? fields[0] : teamName

  let obj = {
    format: "CHIP-0007",
    name: fields[2],
    description: fields[4],
    minting_tool: teamName,
    sensitive_content: false,
    series_number: fields[1],
    series_total: jsonObj.length,
    attributes: fields[6] ? (fields[6].split(";").map(x => {
      let _x = x.split(":")
      return {
        "trait_type": _x[0],
        "value": _x[1]
      }
    })) : [],
  
    collection: {
      name: "Zuri NFT Tickets for Free Lunch",
      id: "b774f676-c1d5-422e-beed-00ef5510c64d",
      attributes: [
        {
          type: "description",
          value: "Rewards for accomplishments during HNGi9."
        }
      ]
    }
  }

  let uri = path.join(__dirname, "json_files", `${fields[2]}.json`)

  const hash = crypto.createHash("sha256").update(uri).digest("hex")

  obj.HASH = hash

  fs.appendFile(uri, JSON.stringify(obj), err => {
    if (err) throw err;
    console.log("Saved!")
  })
  // console.log(hash)
}

// let _uri = path.join(__dirname, "json_files")

// fs.readdir(_uri, (err, files) => {
//   if (err) throw err;
  
//   files.forEach(file => {
//     const csv = fs.createReadStream(file).pipe(generate)
//   })

//   console.log(csv)
// })

// path.join(__dirname, "chipFiles")
