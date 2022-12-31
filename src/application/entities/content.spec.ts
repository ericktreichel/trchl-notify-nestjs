import { Content } from "./content"

describe('Notification content', () => {

it('should be able to create a notification content', () => {
    const content = new Content('You have a new friend request')

    expect(content).toBeTruthy()
})


it('should not be able to create a notification content smaller than 5-characters long', () => {
    expect(() => new Content('uai')).toThrow()
})


it('should not be able to create a notification content smaller than 5-characters long', () => {
    expect(() => new Content('uai'.repeat(81))).toThrow()
})

})