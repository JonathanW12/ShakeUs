export default class GuestService {
  static guestId;
  static isHost;

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
  static async getAllGuests(partyId, guestId) {
    let url =
      "https://shakeus.herokuapp.com:443/guest/get-all/" +
      partyId +
      "/" +
      guestId;
    console.log("url: " + url);
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    let allGuests = await response.json();
    return allGuests;
  }
}
