export class NotificationNotFound extends Error {
    constructor() {
        super('Opss... Notification not found!')
    }
}