import csv from "csv-parser";
import converter from "json-2-csv";
import fs from "fs";

export const read_csv = async (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => {
        return resolve(results);
      })
      .on("error", (err) => {
        return reject(err);
      });
  });
};

export const write_csv = async (filePath, data) => {
  return new Promise((resolve, reject) => {
    converter.json2csv(data, (err, csv) => {
      if (err) {
        return reject(err);
      }
      fs.writeFile(filePath, csv, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });
  });
};
