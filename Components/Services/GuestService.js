export default class GuestService {
  static getGuest(guestId) {
    return fetch("https://shakeus.herokuapp.com:443/guest/" + guestId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        
      },
    }).then(async (res) => {

      return await res.json();
    });
  }
  static patchGuest(guestId, newName) {
    return fetch("https://shakeus.herokuapp.com:443/guest/" + guestId, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({ guestId, newName }),
    }).then(async (res) => {
      return await res.json();
    });
  }
  static getAllGuests(partyId, guestId) {
    return fetch(
      "https://shakeus.herokuapp.com:443/guest/" + partyId + "/" + guestId,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    ).then(async (res) => {
      return await res.json();
    });
  }
}
