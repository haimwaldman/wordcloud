const fs = require("fs");
const { getArticles } = require("./dal");
const { parseArticle, countWords, removeStopWords } = require("./bl");

// The result of this service function is a json in WORDCLOUD_FILENAME
async function wordCloud() {
  const WORDCLOUD_FILENAME = "public/articlesCloud.json";
  console.log("getting articles");
  const articles = await getArticles();

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
    WORDCLOUD_FILENAME,
    JSON.stringify(fiftySortedWords),
    (err) => {
      if (err) console.error(err);
      else console.log("saved word cloud to json");
    }
  );
}

module.exports = { wordCloud };
