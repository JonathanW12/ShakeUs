export default class ActivityPackService {
    static async updateCurrentPack(activityPackId) {
        const res = await fetch(
            `https://shakeus.herokuapp.com:443/activity-pack/${activityPackId}`
        );

        if (res.ok) {
            const data = await res.json();

            const activityPack = {
                _id: data._id,
                title: data.title,
                description: data.description,
                activities: data.activities,
            };

            return activityPack;
        }

        return null;
    }

    static async getActivityPackTemplates() {
        const res = await fetch(
            'https://shakeus.herokuapp.com:443/activity-pack/templates'
        );

        if (res.ok) {
            return await res.json();
        }

        return null;
    }

    static async createActivityPack(title, description) {
        const res = await fetch(
            'https://shakeus.herokuapp.com:443/activity-pack/',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: JSON.stringify({ title, description }),
            }
        );

        if (res.ok) {
            return await res.json();
        }

        return null;
    }

    static async getActivityPack(activityPackId) {
        const res = await fetch(
            'https://shakeus.herokuapp.com:443/activity-pack/' + activityPackId
        );
        return await res.json();
    }

    static async patchActivityPack(activityPackId, newTitle, newDescription) {
        let patchedActivityPack = { activityPackId };

        if (newTitle) {
            patchedActivityPack.newTitle = newTitle;
        }
        if (newDescription) {
            patchedActivityPack.newDescription = newDescription;
        }

        const res = await fetch(
            'https://shakeus.herokuapp.com:443/activity-pack/',
            {
                method: 'PATCH',
                headers: {
                    Accept: 'application/json',
                },
                body: JSON.stringify(patchedActivityPack),
            }
        );

        if (res.ok) {
            return await res.json();
        }

        return null;
    }

    static async addActivityToPack(activityPackId, activityId) {
        const res = await fetch(
            'https://shakeus.herokuapp.com:443/activity-pack/add-activity',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activityPackId, activityId }),
            }
        );

        return res.ok;
    }

    static async removeActivityFromPack(activityPackId, activityId) {
        const res = await fetch(
            'https://shakeus.herokuapp.com:443/activity-pack/remove-activity',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ activityPackId, activityId }),
            }
        );

        return res.ok;
    }

    static async deleteActivityPack(activityPackId, activityId) {
        const res = await fetch(
            'https://shakeus.herokuapp.com:443/activity-pack',
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                },
                body: JSON.stringify({ activityPackId }),
            }
        ).then(async (res) => {
            return await res.json();
        });

        if (res.ok) {
            return await res.json();
        }

        return null;
    }
}
