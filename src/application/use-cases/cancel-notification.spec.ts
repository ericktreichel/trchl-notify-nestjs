import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CancelNotification } from "./cancel-notification"
import { NotificationNotFound } from "./errors/notification-not-found"
import { makeNotification } from "@test/factories/notification-factory"

describe('Cancel a notification', () => {
    it('should be able to send a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const cancelNotification = new CancelNotification(notificationsRepository)

        const notification = makeNotification()

        await notificationsRepository.create(notification)

        await cancelNotification.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date))
    })

    it("should not be able to cancel a notification that doesn't exist", async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const cancelNotification = new CancelNotification(notificationsRepository)

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'invalid-id-lalalal'
        })
        }).rejects.toThrow(NotificationNotFound)
    })
})