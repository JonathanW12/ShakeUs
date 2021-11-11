export default class ActivityService {
  static createActivity(title, description, startTime) {
    return fetch("https://shakeus.herokuapp.com:443/activity/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        startTime: startTime,
      }),
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
    return fetch("https://shakeus.herokuapp.com:443/activity", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activityId: activityId,
        newTitle: newTitle,
        newDescription: newDescription,
        newStartTime: newStartTime,
      }),
    }).then(async (res) => {
      if (res.ok) {
        console.log(res.status);
      } else {
        console.log(res.status);
      }
    });
  }
}
