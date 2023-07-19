const fs = require("fs");
const { getArticles_api } = require("./dal");
const { parseArticle, countWords, removeStopWords } = require("./bl");
async function wordCloud() {
  console.log("getting articles");
  const articles = await getArticles_api();
  console.log("parsing contents");
  wordCounts = [];
  articles.forEach((article) => {
    const parsed = parseArticle(article);
    const wordsWithoutStopWords = removeStopWords(parsed);
    wordCounts = countWords(wordsWithoutStopWords, wordCounts);
  });
  const fiftySortedWords = Object.entries(wordCounts)
    .sort((k, v) => v[1] - k[1])
    .slice(0, 50);
  await fs.writeFile(
    "public/articlesCloud.json",
    JSON.stringify(fiftySortedWords),
    (err) => {
      if (err) console.error(err);
      else console.log("saved word cloud to json");
    }
  );
}
module.exports = { wordCloud };
