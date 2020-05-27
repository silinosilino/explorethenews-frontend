export default class UserStatus {
  constructor(isLoggedIn) {
    this.isLoggedIn = isLoggedIn;
    // this.openImageCallback = openImageCallback;
    // this.api = api;
  }

  getStatus() {
    return this.isLoggedIn;
  }

  switchStatus() {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
