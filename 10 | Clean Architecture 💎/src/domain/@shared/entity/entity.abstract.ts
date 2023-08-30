import Notification from "../notification/notification";

export default abstract class EntityAbstract {
    protected abstract id: string;
    public notification: Notification

    constructor() {
        this.notification = new Notification();
    }
}