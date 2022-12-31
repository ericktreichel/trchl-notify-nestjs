import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { SendNotification } from "./send-notification"

describe('Send a notification', () => {
    it('should be able to send a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const sendNotification = new SendNotification(notificationsRepository)

        // essa notification abaixo ele usou desestruturação, mas não sei o motivo
        // se não usar desestruturação ele não passa no ultimo teste
        const { notification } = await sendNotification.execute({
            content: 'This is a darn notification',
            category: 'social',
            recipientId: 'example-recipient-id'
        })

        expect(notificationsRepository.notifications).toHaveLength(1)
        expect(notificationsRepository.notifications[0]).toEqual(notification)
    })
})