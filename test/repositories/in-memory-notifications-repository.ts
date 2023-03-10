import { Notification } from "@application/entities/notification"
import { NotificationsRepository } from "@application/repositories/notifications-repository"

export class InMemoryNotificationsRepository implements NotificationsRepository {

    public notifications: Notification[] = []

    async create(notification: Notification) {
        this.notifications.push(notification)
    }

    async findById(notificationId: string): Promise<Notification> {
        const notification = this.notifications.find(item => item.id == notificationId)

        if (!notification) {
            return null
        }
        return notification
    }

    async findAllNotifications(): Promise<Notification[]> {
        const notif = this.notifications.filter(notification => notification)
        return notif
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        return this.notifications.filter(notification => notification.recipientId === recipientId)
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        return this.notifications.filter(notification => notification.recipientId === recipientId).length
    }

    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex(item => item.id == notification.id)

        if (notificationIndex >= 0) {
            this.notifications[notificationIndex] = notification
        }
    }
}