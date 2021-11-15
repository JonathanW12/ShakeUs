export default class ActivityService {
    static async createActivity(title, description, startTime) {
        return fetch('https://shakeus.herokuapp.com:443/activity/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                description: description,
                startTime: startTime,
            }),
        }).then(async (res) => {
            if (res) {
                return await res.json();
            }

            return null;
        });
    }

    static async getActivityById(id) {
        return fetch('https://shakeus.herokuapp.com:443/activity/' + id).then(
            async (res) => {
                if (res) {
                    return await res.json();
                }

                return null;
            }
        );
    }

    static async getAllActivitiesByActivityPackId(activityPackId) {
        const response = await fetch(
            `https://shakeus.herokuapp.com:443/activity/get-all/${activityPackId}`
        );

        if (response.ok) {
            return await response.json();
        } else {
            console.log('Failed to load activities from: ' + activityPackId);
        }

        return null;
    }

    static async deleteActivity(id) {
        const res = await fetch(
            'https://shakeus.herokuapp.com:443/activity/' + id,
            {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activityId: id }),
            }
        );

        return res.ok;
    }

    static async getActivityTemplates() {
        return fetch(
            'https://shakeus.herokuapp.com:443/activity/templates'
        ).then(async (res) => {
            if (res) {
                return await res.json();
            }

            return null;
        });
    }

    static async getNextActivity(partyId, userId) {
        return fetch(
            'https://shakeus.herokuapp.com:443/activity/next/' +
                partyId +
                '/' +
                userId
        ).then(async (res) => {
            if (res) {
                return await res.json();
            }

            return null;
        });
    }

    static async patchActivity(
        activityId,
        newTitle,
        newDescription,
        newStartTime
    ) {
        return fetch('https://shakeus.herokuapp.com:443/activity', {
            method: 'PATCH',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                activityId: activityId,
                newTitle: newTitle,
                newDescription: newDescription,
                newStartTime: newStartTime,
            }),
        }).then((res) => {
            if (res.ok) {
                return true;
            }

            return false;
        });
    }

    // Perfer these, can remove if you dont like
    static async getNextActivityNico(partyId, userId) {
        const res = await fetch(
            'https://shakeus.herokuapp.com:443/activity/next/' +
                partyId +
                '/' +
                userId
        );

        if (res.ok) {
            return await res.json();
        }

        return null;
    }

    static async getAllActivities(activityPackId) {
        const res = await fetch(
            'https://shakeus.herokuapp.com:443/activity/get-all/' +
                activityPackId
        );

        if (res.ok) {
            return await response.json();
        }

        return null;
    }
}
