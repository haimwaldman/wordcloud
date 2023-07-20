# wordcloud
Important Notice:
- In order for this code to work, you need to add a config.json file in src/services/word-cloud.
- The file needs to contain the following json:
```sh
{
    "dal": {
        "BASE_URL": "https://newsdata2.p.rapidapi.com/news",
        "X-RapidAPI-Key": "<MyRapidApiKey>", // get from rapidapi site after you sign up
        "X-RapidAPI-Host": "newsdata2.p.rapidapi.com"
    }
}
```
Start the app:
```sh
npm start
```
Now open site:
```sh
http://localhost:3000/
```
