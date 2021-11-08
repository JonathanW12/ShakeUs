export default class ActivityPackService {
  static currentPack;

  static getActivityPackTemplates() {
    return fetch(
      "https://shakeus.herokuapp.com:443/activity-pack/templates"
    ).then(async (res) => {
      return await res.json();
    });
  }
  static createActivityPack(title, description) {
    return fetch("https://shakeus.herokuapp.com:443/activity-pack/", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ title, description }),
    }).then(async (res) => {
      return await res.json();
    });
  }
  static getActivityPack(activityPackId) {
    return fetch(
      "https://shakeus.herokuapp.com:443/activity-pack/" + activityPackId
    ).then(async (res) => {
      return await res.json();
    });
  }

  static patchActivityPack(activityPackId, newTitle, newDescription) {
    let patchedActivityPack = { activityPackId };
    if ((newTitle = !undefined)) {
      patchedActivityPack.newTitle = newTitle;
    }
    if ((newDescription = !undefined)) {
      patchedActivityPack.newDescription = newDescription;
    }
    return fetch("https://shakeus.herokuapp.com:443/activity-pack/", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(patchedActivityPack),
    }).then(async (res) => {
      return await res.json();
    });
  }
  static addActivityToPack(activityPackId, activityId) {
    return fetch(
      "https://shakeus.herokuapp.com:443/activity-pack/add-activity",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({ activityPackId, activityId }),
      }
    ).then(async (res) => {
      return await res.json();
    });
  }

  static removeActivityFromPack(activityPackId, activityId) {
    return fetch(
      "https://shakeus.herokuapp.com:443/activity-pack/remove-activity",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({ activityPackId, activityId }),
      }
    ).then(async (res) => {
      return await res.json();
    });
  }

  static deleteActivityPack(activityPackId, activityId) {
    return fetch("https://shakeus.herokuapp.com:443/activity-pack", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ activityPackId }),
    }).then(async (res) => {
      return await res.json();
    });
  }
}
