export default class PartyService {
  static async createParty(activtyPackId, hostName, notificationToken) {
    const res = await fetch("https://shakeus.herokuapp.com:443/party", {
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
    });

    if (res.ok) {
      return await res.json();
    }

    return null;
  }

  static async getParty(partyId, guestId) {
    const res = await fetch(
      `https://shakeus.herokuapp.com:443/party/${partyId}/${guestId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (res.ok) {
      return await res.json();
    }

    return null;
  }

  static async patchParty(
    partyId,
    primaryHostId,
    newActivityPackId,
    newPrimary
  ) {
    partyPatch = { partyId, primaryHostId };

    if (newActivityPackId) {
      partyPatch.newActivityPackId = newActivityPackId;
    }
    if (newPrimary) {
      partyPatch.newPrimary = newPrimary;
    }

    const res = await fetch(
      `https://shakeus.herokuapp.com:443/party/${partyId}/${guestId}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify(partyPatch),
      }
    );

    if (res.ok) {
      return await res.json();
    }

    return null;
  }

  static async addHostToParty(partyId, hostId, newHostId) {
    const res = await fetch(
      "https://shakeus.herokuapp.com:443/party/add-host",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({ partyId, hostId, newHostId }),
      }
    );

    return res.ok;
  }

  static async removeHostFromParty(partyId, primaryHostId, removedHostId) {
    const res = await fetch(
      "https://shakeus.herokuapp.com:443/party/remove-host",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({ partyId, primaryHostId, removedHostId }),
      }
    );

    return res.ok;
  }
  static async removeGuestFromParty(partyId, hostId, removedGuestId) {
    const res = await fetch(
      "https://shakeus.herokuapp.com:443/party/remove-guest",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          partyId: partyId,
          hostId: hostId,
          removedGuestId: removedGuestId,
        }),
      }
    );

    return res.ok;
  }

  static async joinParty(partyId, guestName, guestNotificationToken) {
    const res = await fetch("https://shakeus.herokuapp.com:443/party/join", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        partyId,
        guestName,
        guestNotificationToken,
      }),
    });

    if (res.ok) {
      return await res.json();
    }

    return null;
  }

  static async leaveParty(partyId, userId) {
    const res = await fetch("https://shakeus.herokuapp.com:443/party/leave", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ partyId, userId }),
    });

    return res.ok;
  }

  static async deleteParty(partyId, primaryHostId) {
    const res = await fetch("https://shakeus.herokuapp.com:443/party", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ partyId, primaryHostId }),
    });

    return res.ok;
  }
}
