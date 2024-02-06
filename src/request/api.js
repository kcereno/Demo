const Papa = require('papaparse');
const fs = require('fs');
const path = require('path');

const rawDataFilePath = path.join(__dirname, 'loansize.csv');

const parseData = (result, rawData) => {
  result.data.splice(0, 2);
  const { data } = result;
  for (let i = 0; i < data.length; i += 1) {
    const year = data[i][0];
    const quarter = data[i][1];
    const grade = data[i][2];
    const homeOwnership = data[i][3];
    const term = data[i][4];
    const currentBalance = data[i][5];
    rawData.push({
      year,
      quarter,
      grade,
      homeOwnership,
      term,
      currentBalance,
    });
  }

  return rawData;
};

const getData = async () => {
  const csvData = fs.readFileSync(rawDataFilePath, 'utf-8');
  const data = [];
  await Papa.parse(csvData, {
    complete: (result) => parseData(result, data),
  });

  return data;
};

module.exports = { getData };
