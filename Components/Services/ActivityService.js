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

  static getActivityById(id) {
    return fetch("https://shakeus.herokuapp.com:443/activity", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ activityId: id }),
    })
      .then(async (res) => {
        return await res.json();
      })
      .then((activity) => {
        console.log(activity);
        return activity;
      });
  }
}
