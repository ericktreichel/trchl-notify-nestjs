import { Injectable } from "@nestjs/common"
import { NotificationsRepository } from "../repositories/notifications-repository"
import { Notification } from "@application/entities/notification"

interface GetAllNotificationsResponse {
    notifications: Notification[]
}

@Injectable()
export class GetAllNotifications {
    constructor(
        private notificationsRepository: NotificationsRepository) {}
    async execute(): Promise<GetAllNotificationsResponse> {
        const notifications = await this.notificationsRepository.findAllNotifications()
        
        return { notifications }
    }
}