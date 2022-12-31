import { Content } from "./content"
import { Notification } from "./notification"

describe('Notification itself', () => {

it('should be able to create a notification', () => {
    const notification = new Notification({
        content: new Content('New friend request!'),
        category: 'social',
        recipientId: '1234-5678-9009',
        createdAt: new Date()
    })

    expect(notification).toBeTruthy()
})

})