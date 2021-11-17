export default class GuestService {
    static async getGuest(guestId) {
        const res = await fetch(
            'https://shakeus.herokuapp.com:443/guest/' + guestId,
            {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                },
            }
        );

        if (res.ok) {
            return await res.json();
        }

        return null;
    }

    static async patchGuest(guestId, newName) {
        const res = await fetch(
            'https://shakeus.herokuapp.com:443/guest/' + guestId,
            {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                },
                body: JSON.stringify({ guestId, newName }),
            }
        );

        if (res) {
            return await res.json();
        }

        return null;
    }

    static async getAllGuests(partyId, guestId) {
        const response = await fetch(
          `https://shakeus.herokuapp.com:443/guest/get-all/${partyId}/${guestId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (response.ok) {
            return await response.json();
        }

        return null;
    }
}
