export class UserInfo {
  constructor(nameSelector, JobSelector, avatarSelector) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(JobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo(name, job, image) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this._avatarElement.src = image;
  }
}
