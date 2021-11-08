export default class ActivityService {
  static createActivity(title, description, startTime) {
    return fetch("https://shakeus.herokuapp.com:443/activity/", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ title, description, startTime }),
    }).then(async (res) => {
      return await res.json();
    });
  }

  static getActivityById(id) {
    return fetch("https://shakeus.herokuapp.com:443/activity/" + id)
      .then(async (res) => {
        return await res.json();
      })
      .then((obj) => {
        console.log(obj);
        return obj;
      });
  }

  static getActivityTemplates() {
    return fetch("https://shakeus.herokuapp.com:443/activity/templates").then(
      async (res) => {
        return await res.json();
      }
    );
  }

  static getNextActivity(partyId, userId) {
    return fetch(
      "https://shakeus.herokuapp.com:443/activity/next/" +
        partyId +
        "/" +
        userId
    ).then(async (res) => {
      return await res.json();
    });
  }

  static patchActivity(activityId, newTitle, newDescription, newStartTime) {
    patchedActivity = { activityId };
    if (newTitle != undefined) {
      patchedActivity.newTitle = newTitle;
    }
    if (newDescription != undefined) {
      patchedActivity.newDescription = newDescription;
    }
    if (newDescription != undefined) {
      patchedActivity.newDescription = newDescription;
    }
    return fetch("https://shakeus.herokuapp.com:443/activity", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(patchedActivity),
    }).then(async (res) => {
      return await res.json();
    });
  }
}
