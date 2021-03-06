export default class ActivityService {
    static async createActivity(title, description, startTime) {
        const res = await fetch("https://shakeus.herokuapp.com:443/activity/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: description,
                startTime: +this.roundDownTime(+startTime),
            }),
        });
 
        if (res.ok) {
            return await res.json();
        }
 
        return null;
    }
 
    static async getActivityById(id) {
        const res = await fetch(
            "https://shakeus.herokuapp.com:443/activity/" + id
        );
 
        if (res.ok) {
            return await res.json();
        }
 
        return null;
    }
 
    static async getAllActivitiesByActivityPackId(activityPackId) {
        const res = await fetch(
            `https://shakeus.herokuapp.com:443/activity/get-all/${activityPackId}`
        );
 
        if (res.ok) {
            return await res.json();
        } else {
        }
 
        return null;
    }
 
    static async deleteActivity(id) {
        const res = await fetch("https://shakeus.herokuapp.com:443/activity", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ activityId: id }),
        });
 
        return res.ok;
    }
 
    static async getActivityTemplates() {
        const res = await fetch(
            "https://shakeus.herokuapp.com:443/activity/templates"
        );
 
        if (res.ok) {
            return await res.json();
        }
 
        return null;
    }
 
    static async getNextActivity(partyId, userId) {
        const res = await fetch(
            "https://shakeus.herokuapp.com:443/activity/next/" +
                partyId +
                "/" +
                userId
        );
 
        if (res.ok) {
            return await res.json();
        }
 
        return null;
    }
 
    static async patchActivity(
        activityId,
        newTitle,
        newDescription,
        newStartTime
    ) {
        const res = await fetch("https://shakeus.herokuapp.com:443/activity", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                activityId: activityId,
                newTitle: newTitle,
                newDescription: newDescription,
                newStartTime: +this.roundDownTime(+newStartTime),
            }),
        });
 
        return res.ok;
    }
 
    // Perfer these, can remove if you dont like
    static async getNextActivityNico(partyId, userId) {
        const res = await fetch(
            "https://shakeus.herokuapp.com:443/activity/next/" +
                partyId +
                "/" +
                userId
        );
 
        if (res.ok) {
            return await res.json();
        }
 
        return null;
    }
 
    static async getAllActivities(activityPackId) {
        const res = await fetch(
            "https://shakeus.herokuapp.com:443/activity/get-all/" +
                activityPackId
        );
 
        if (res.ok) {
            return await res.json();
        }
 
        return null;
    }
 
    static roundDownTime(time) {
        let nowMil = time;
        let roundedMil = Math.floor(nowMil / 1000 / 60) * 60 * 1000;
        return new Date(roundedMil).getTime();
    }
}
 