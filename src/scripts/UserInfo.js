export class UserInfo {
  constructor(selectors) {
    this._profileNameElement = document.querySelector(selectors.name);
    this._profileAvatarElement = document.querySelector(selectors.avatar);
    this._profileDescriptionElement = document.querySelector(selectors.about);
  }

  getUserInfo() {
    return {
      _id: this._id,
      name: this._profileNameElement.textContent,
      avatar: this._profileAvatarElement.src,
      about: this._profileDescriptionElement.textContent,
    }
  }

  setUserInfo(userInfo) {
    this._id = userInfo._id;
    this._profileNameElement.textContent = userInfo.name;
    this._profileAvatarElement.src = userInfo.avatar;
    this._profileAvatarElement.alt = userInfo.name;
    this._profileDescriptionElement.textContent = userInfo.about;
  }
}
