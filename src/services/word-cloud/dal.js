const axios = require("axios");
const appConfig = require("./config.json"); // not in git - add manually
function buildUrl(baseUrl, queryParams) {
  let url = `${baseUrl}?`;
  Object.keys(queryParams).map((param) => {
    url = `${url}${param}=${queryParams[param]}&`;
  });
  return url.substring(0, url.length - 1);
}

async function fetchArticlesFromAPI() {
  const BASE_URL = appConfig.dal.BASE_URL;
  let PARAMS = { language: "en", qintitle: "elon musk" };
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: buildUrl(BASE_URL, PARAMS),
    headers: {
      "X-RapidAPI-Key": appConfig.dal["X-RapidAPI-Key"],
      "X-RapidAPI-Host": appConfig.dal["X-RapidAPI-Host"],
    },
  };
  const results = [];
  let flag = true;
  while (flag) {
    await axios
      .request(config)
      .then((response) => {
        if (response.data.results) {
          response.data.results.map((result) => {
            if (result.content) {
              results.push(result.content);
            }
          });
        }
        if (response.data.nextPage === null) {
          flag = false;
        } else {
          PARAMS["page"] = response.data.nextPage;
          config.url = buildUrl(BASE_URL, PARAMS);
        }
      })
      .catch((error) => {
        flag = false;
        console.log(error);
        throw new Error(error.message);
      });
  }
  return results;
}

async function getArticles() {
  const results = await fetchArticlesFromAPI();
  console.log(results.length);
  if (results.length > 50) {
    return results;
  } else {
    throw new Error("Less than 50 articles about Elon Musk, it's not enough");
  }
}

module.exports = {
  getArticles,
};
// const file1 = require("../data/1.json");
// const file2 = require("../data/2.json");
// const file3 = require("../data/3.json");
// const file4 = require("../data/4.json");
// const file5 = require("../data/5.json");
// const file6 = require("../data/6.json");
// let articles = [];
// function getArticles(file) {
//   file.results.forEach((result) => {
//     if (result.content) return articles.push(result.content);
//   });
//   return articles;
// }
// function getArticles_files() {
//   const files = [file1, file2, file3, file4, file5, file6];
//   files.forEach((file) => {
//     getArticles(file);
//   });
//   return articles;
// }
// module.exports = {
//   getArticles_files,
// };
