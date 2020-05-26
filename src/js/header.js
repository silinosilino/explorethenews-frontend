export default class Header {
  // constructor(props) {
  // this.name = props.name || "Авторизоваться",
  // this.isLoggedIn = props.isLoggedIn || false;
  // // this.color = props.color;
  // this.header = document.querySelector('.header');
  // this.singUpButton = header.querySelector('.menue__item_type_feachered');
  // this.articles = header.querySelector('.menue__item_type_articles');

  constructor() {
    // this.name = props.name || "Авторизоваться",
    // this.isLoggedIn = props.isLoggedIn || false;
    // this.color = props.color;
    // this.isLoggedIn = isLoggedIn;
    const header = document.querySelector('.header');
    this.signupButton = header.querySelector('.menue__item_type_feachered');
    this.articles = header.querySelector('.menue__item_type_articles');
  }


  render(status, name) {
    if (status === 'isLoggedIn') {
      this.articles.classList.remove('menue__item_type_disabled');
      this.signupButton.textContent = name;
      this.signupButton.insertAdjacentHTML('beforeend', `
      <svg class="menue__exit-pic">
        <path class="menue__exit-pic-path menue__exit-pic-path_theme_light"></path>
      </svg>
    `);
    } else if (status === 'isNotLoggedIn') {
      this.articles.classList.add('menue__item_type_disabled');
      this.signupButton.textContent = 'Войти';
      this.signupButton.classList.add('signin');
    } else if (status === 'isNotRegistered') {
      this.articles.classList.add('menue__item_type_disabled');
      this.signupButton.textContent = 'Авторизоваться';
      this.signupButton.classList.add('signup');
    }
  }
  // render(props) {
  //   if (props.isLoggedIn) {
  //     this.articles.classlist.remove('menue__item_type_disabled');
  //     this.signupButton.textContent = props.name;
  //   } else {
  //     this.articles.classlist.add('menue__item_type_disabled');
  //     this.signupButton.textContent = 'Авторизоваться';
  //   }
  // }
}


// export default class UserInfo {
//   constructor(userInfoData, api) {
//     this.userName = userInfo.querySelector('.user-info__name');
//     this.userJob = userInfo.querySelector('.user-info__job');
//     this.userPhoto = userInfo.querySelector('.user-info__photo');
//     this.api = api;
//   }

//   getUserInfo() {
//     const userInfoPromise = this.api.fetchUserInfo();
//     return userInfoPromise.then((result) => {
//       this.userName.textContent = result.name;
//       this.userJob.textContent = result.about;
//       this.userPhoto.style.backgroundImage = `url('${result.avatar}')`;
//       this.api.userId = result._id;
//       return result;
//     });
//   }

//   setUserInfo(name, job) {
//     this.userName.textContent = name;
//     this.userJob.textContent = job;
//   }

//   updateAvatar(photolink) {
//     this.userPhoto.style.backgroundImage = `url('${photolink}')`;
//   }
// }
