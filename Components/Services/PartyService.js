export default class PartService {
static partyId = null;
static hostId = null;
  
  static createParty(activtyPackId, hostName, notificationToken) {
    console.log(activtyPackId);
    console.log(hostName);
    console.log(notificationToken);
      return fetch("https://shakeus.herokuapp.com:443/party", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activityPackId: activtyPackId,
        hostName: hostName,
        hostNotificationToken: notificationToken,
      }),
    })
    /*
    .then((response) => response.json())
    .then(data => {
      return data
    })
    .catch(err => console.error(err));
    //}).then(async (res) => {
    //  return res.json();
    //});
    */

  }

  static getParty(partyId, guestId) {
    return fetch(
      "https://shakeus.herokuapp.com:443/party/" + partyId + "/" + guestId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
    //.then(async (res) => {
    //  return await res.json();
    //});
  }
  static patchParty(partyId, primaryHostId, newActivtyPackId, newPrimary) {
    partyPatch = { partyId, primaryHostId };
    if (newActivityPackId != undefined) {
      partyPatch.newActivityPackId = newActivtyPackId;
    }
    if (newPrimary != undefined) {
      partyPatch.newPrimary = newPrimary;
    }
    return fetch(
      "https://shakeus.herokuapp.com:443/party/" + partyId + "/" + guestId,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
        },
      }
    ).then(async (res) => {
      return await res.json();
    });
  }
  static addHostToParty(partyId, hostId, newHostId) {
    return fetch("https://shakeus.herokuapp.com:443/party/add-host", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ partyId, hostId, newHostId }),
    }).then(async (res) => {
      return await res.json();
    });
  }

  static removeHostFromParty(partyId, primaryHostId, removedHostId) {
    return fetch("https://shakeus.herokuapp.com:443/party/remove-host", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ partyId, primaryHostId, removedHostId }),
    }).then(async (res) => {
      return await res.json();
    });
  }
  static removeGuestFromParty(partyId, hostId, removedGuestId) {
    return fetch("https://shakeus.herokuapp.com:443/party/remove-guest", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ partyId, hostId, removedGuestId }),
    }).then(async (res) => {
      return await res.json();
    });
  }

  static joinParty(partyId, guestName) {
    return fetch("https://shakeus.herokuapp.com:443/party/join", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ partyId, guestName }),
    })
    
    //.then(async (res) => {
    //  return await res.json();
    //});
  }
  static leaveParty(partyId, userId) {
    return fetch("https://shakeus.herokuapp.com:443/party/leave", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ partyId, userId }),
    }).then(async (res) => {
      return res.json();
    });
  }
  static deleteParty(partyId, primaryHostId) {
    return fetch("https://shakeus.herokuapp.com:443/party", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ partyId, primaryHostId }),
    }).then(async (res) => {
      return await res.json();
    });
  }
}
