const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const axios = require("axios");
const cheerio = require("cheerio");

 

let indizes = [];
const setIndexName = (num, indexName) => {
  const dict = {
    name: "",
    score: 0,
    gainToday: 0,
    gainTodayPercentage: 0,
  };
  dict["name"] = indexName;
  indizes.push(dict);
};
const setPoints = (num, points) => {
  let actualDict = indizes[num];
  actualDict.score = points;
};

const setPriceGain = (num, priceGain) => {
  indizes[num].gainToday = priceGain;
};

const setActualGain = (num, actualGain) => {
  if (indizes[num].gainToday.includes("-")) {
    indizes[num].gainTodayPercentage = `-${actualGain}`;
  } else {
    indizes[num].gainTodayPercentage = actualGain;
  }
};

function parseHtml(parser, classString, callBackFunc) {
  try {
    parser(classString).each(function (num, el) {
      const storageVal = parser(this).text();
      callBackFunc(num, storageVal);
    });
  } catch (e) {
    console.log(`Parser not correctly working.\nError:${e}`);
  }
}
app.get("/",(req,res) => {
  res.send("Hi Please add a route to home. [/indexAsia] or [/indexEuropeOther] or [/indexAmerica]");
})
app.get("/[Ii]ndex[Aa]merica", async (req, res) => {
  try {
    indizes = [];
    const response = await axios.get(
      "https://www.google.com/finance/markets/indexes/americas"
    );
    const htmlCode = response.data;
    const $ = cheerio.load(htmlCode);
    parseHtml($, ".sbnBtf .ZvmM7", setIndexName);
    parseHtml($, ".sbnBtf .YMlKec", setPoints);
    parseHtml($, ".sbnBtf .P2Luy", setPriceGain);
    parseHtml($, ".sbnBtf .JwB6zf", setActualGain);

    res.json(indizes);
  } catch (e) {
    console.log(`Something not working in Request. Error: ${e}`);
  }
});

app.get("/[Ii]ndex[Aa]sia", async (req, res) => {
  try {
    indizes = [];
    const response = await axios.get(
      "https://www.google.com/finance/markets/indexes/asia-pacific"
    );
    const htmlCode = response.data;
    const $ = cheerio.load(htmlCode);
    parseHtml($, ".sbnBtf .ZvmM7", setIndexName);
    parseHtml($, ".sbnBtf .YMlKec", setPoints);
    parseHtml($, ".sbnBtf .P2Luy", setPriceGain);
    parseHtml($, ".sbnBtf .JwB6zf", setActualGain);

    res.json(indizes);
  } catch (e) {
    console.log(`Something not working in Request. Error: ${e}`);
  }
});

app.get("/[Ii]ndex[Ee]urope[Oo]ther", async (req, res) => {
  try {
    indizes = [];
    const response = await axios.get(
      "https://www.google.com/finance/markets/indexes/europe-middle-east-africa"
    );
    const htmlCode = response.data;
    const $ = cheerio.load(htmlCode);
    parseHtml($, ".sbnBtf .ZvmM7", setIndexName);
    parseHtml($, ".sbnBtf .YMlKec", setPoints);
    parseHtml($, ".sbnBtf .P2Luy", setPriceGain);
    parseHtml($, ".sbnBtf .JwB6zf", setActualGain);

    res.json(indizes);
  } catch (e) {
    console.log(`Something not working in Request. Error: ${e}`);
  }
});

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
