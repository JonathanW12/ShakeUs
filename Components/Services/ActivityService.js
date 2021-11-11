export default class ActivityService {
  static createActivity(title, description, startTime) {
    console.log(title, description, startTime);
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

  // Perfer these, can remove if you dont like
  static async getNextActivityNico(partyId, userId){
    const response = await fetch(
      "https://shakeus.herokuapp.com:443/activity/next/" +
        partyId +
        "/" +
        userId
    );
    return response.json();
  }

  static async getAllActivities(activityPackId){
    const response = await fetch(
      "https://shakeus.herokuapp.com:443/activity/get-all/" + activityPackId
    );
    return response.json();
  }

}
