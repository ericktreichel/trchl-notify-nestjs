import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { makeNotification } from "@test/factories/notification-factory"
import { GetAllNotifications } from "./get-all-notifications"

describe('Get all notifications from database', () => {
    it('should be able to get all notifications on database', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const getAllNotifications = new GetAllNotifications(notificationsRepository)

        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1'}))
        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1'}))
        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2'}))
        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2'}))
        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-3'}))
        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-4'}))

        const { notifications } = await getAllNotifications.execute()

        expect(notifications).toHaveLength(6)
    })

})