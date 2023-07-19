const toRemove = require("../../../data/stopwords.json");
function parseArticle(text) {
  if (text) {
    return text.replace(/[^\w\s]/g, " ").toLowerCase();
  }
  return null;
}

function removeStopWords(words) {
  let wordsWithoutStopWords;
  if (words) {
    const splittedWords = words.split(/\s+/);
    wordsWithoutStopWords = splittedWords.map((word) => {
      if (!toRemove.includes(word) && !word.includes("_")) return word;
    });
  }
  return wordsWithoutStopWords;
}
function countWords(words, wordCount) {
  for (const word of words) {
    if (word) {
      wordCount[word] = (wordCount[word] || 0) + 1;
    }
  }
  return wordCount;
}

module.exports = {
  parseArticle,
  countWords,
  removeStopWords,
};
