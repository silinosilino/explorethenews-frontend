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
    this.singUpButton = header.querySelector('.menue__item_type_feachered');
    this.articles = header.querySelector('.menue__item_type_articles');
  }


  render(props) {
    if (props.isLoggedIn) {
      this.articles.classlist.remove('menue__item_type_disabled');
      this.signupButton.textContent = props.name;
    } else {
      this.articles.classlist.add('menue__item_type_disabled');
      this.signupButton.textContent = 'Авторизоваться';
    }
  }
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
