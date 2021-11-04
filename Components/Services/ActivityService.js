export default class ActivityService {
  static currentPack;

  static getActivityPackTemplates() {
    return fetch("https://shakeus.herokuapp.com:443/activity-pack/templates", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }).then(async (res) => {
      return await res.json();
    });
  }
}
