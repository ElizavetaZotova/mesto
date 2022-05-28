export class UserInfo {
  constructor(selectors) {
    this._profileNameElement = document.querySelector(selectors.name);
    this._profileDescriptionElement = document.querySelector(selectors.description);
  }

  getUserInfo() {
    return {
      name: this._profileNameElement.textContent,
      description: this._profileDescriptionElement.textContent,
    }
  }

  setUserInfo(userInfo) {
    this._profileNameElement.textContent = userInfo.name;
    this._profileDescriptionElement.textContent = userInfo.description;
  }
}
