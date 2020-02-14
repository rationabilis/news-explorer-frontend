/* NewsApi. Отвечает за взаимодействие с NewsAPI.
У класса есть конструктор, принимающий опции, и единственный обязательный метод getNews.
getNews возвращает список новостей на основе запроса. */

export default class NewsApi {
  constructor(apiKey, days, lang) {
    this.apiKey = apiKey;
    this.days = days;
    this.lang = lang;
  }

  getNews(request) {
    const now = new Date();
    const interval = new Date(now - this.days * 24 * 3600 * 1000);
    const to = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    const from = `${interval.getFullYear()}-${interval.getMonth() + 1}-${interval.getDate()}`;
    const newsUrl = `https://newsapi.org/v2/everything?sortBy=popularity&apiKey=${this.apiKey}&language=${this.lang}&pageSize=100&q=${request}&from=${from}&to=${to}`;
    console.log(now, interval, to, from, newsUrl);
    return fetch(newsUrl)
      .then((res) => {
        if (!res.ok) throw new Error('Невозможно выполнить запрос');
        return res.json();
      })
      .then((data) => {
        const newsArray = [];
        for (let i = 0; i < data.articles.length; i += 1) {
          newsArray.push({
            source: data.articles[i].source.name,
            title: data.articles[i].title,
            date: new Date(Date.parse(data.articles[i].publishedAt)),
            text: data.articles[i].description,
            image: data.articles[i].urlToImage,
            link: data.articles[i].url,
            keyword: request,
          });
        }
        return newsArray;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
