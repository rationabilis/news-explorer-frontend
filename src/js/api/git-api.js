export default class GitApi {
  constructor(gitUrl) {
    this.gitUrl = gitUrl;
  }

  getCommits() {
    return fetch(this.gitUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка GitApi ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const commitsArray = [];
        const commitsNumber = data.length < 30 ? data.length : 30;
        for (let i = 0; i < commitsNumber; i += 1) {
          commitsArray.push({
            name: data[i].commit.committer.name,
            email: data[i].commit.committer.email,
            date: new Date(Date.parse(data[i].commit.committer.date)),
            message: data[i].commit.message,
            avatar: data[i].author.avatar_url,
          });
        }
        return commitsArray;
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  }
}
