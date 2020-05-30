export default class Intro {
  constructor() {
    this.introTitle = document.querySelector('.intro__title');
    this.introText = document.querySelector('.intro__text');
  }

  setName(name) {
    this.name = name;
  }

  setLength(length) {
    this.length = length;
  }

  setText(arr) {
    const keywordsArr = [];
    arr.forEach((item) => {
      keywordsArr.push(item.keyword);
    });
    const uniqueKeywords = keywordsArr.filter((v, i, a) => a.indexOf(v) === i);
    const keywords = uniqueKeywords.map((item) => item.charAt(0).toUpperCase()
      + item.toString().slice(1));
    if (keywords.length === 0) {
      this.introText.textContent = '';
    } else if (keywords.length === 1) {
      this.introText.textContent = `По ключевому слову: ${keywords[0]}`;
    } else if (keywords.length === 2) {
      this.introText.textContent = `По ключевым словам: ${keywords[0]} и ${keywords[1]}`;
    } else if (keywords.length === 3) {
      this.introText.textContent = `По ключевым словам: ${keywords[0]}, ${keywords[1]} и ${keywords[2]}`;
    } else if (keywords.length > 3) {
      this.introText.textContent = `По ключевым словам: ${keywords[0]}, ${keywords[1]} и ${keywords.length - 2} другим`;
    }
  }

  setTitle() {
    let ending = '';
    let artEnding = '';
    let number = this.length;
    while (number > 20) {
      number -= 20;
    }
    if (number === 1) {
      ending = 'ая';
      artEnding = 'ья';
    } else if (number > 1 && number < 5) {
      ending = 'ых';
      artEnding = 'ьи';
    } else if (number > 4 && number < 21) {
      ending = 'ых';
      artEnding = 'ей';
    }
    this.introTitle.textContent = `${this.name}, у вас ${this.length} сохранённ${ending} стат${artEnding}`;
  }
}
