export default class UserStatus {
  constructor(isLoggedIn) {
    this.isLoggedIn = isLoggedIn;
  }

  getStatus() {
    return this.isLoggedIn;
  }

  switchStatus() {
    this.isLoggedIn = !this.isLoggedIn;
  }
}
