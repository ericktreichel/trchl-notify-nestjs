import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from '@application/use-cases/send-notification';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { GetAllNotifications } from '@application/use-cases/get-all-notifications';

@Controller('notifications')
export class NotificationsController {
	constructor(
		private sendNotification: SendNotification,
		private cancelNotification: CancelNotification,
		private readNotification: ReadNotification,
		private unreadNotification: UnreadNotification,
		private countRecipientNotifications: CountRecipientNotifications,
		private getRecipientNotifications: GetRecipientNotifications,
		private getAllNotifications: GetAllNotifications
		) { }

	@Patch(':id/cancel')
	async cancel(@Param('id') id: string) {
		await this.cancelNotification.execute({notificationId: id})
		console.log(`done. notification ${id} canceled!`)
	}

	@Get('all')
	async findAll() {
		const {notifications} = await this.getAllNotifications.execute()
		
		return {notifications}
	}

	@Get('count/:recipientId')
	async countFromRecipient(@Param('recipientId') recipientId: string): Promise<{count: number}> {
		const { count } = await this.countRecipientNotifications.execute({ recipientId })
		
		return { count }
	}

	@Get('from/:recipientId')
	async getFromRecipient(@Param('recipientId') recipientId: string) {
		const { notifications } = await this.getRecipientNotifications.execute({ recipientId })
		
		return { notifications: notifications.map(NotificationViewModel.toHTTP) }
	}

	@Patch(':id/read')
	async read(@Param('id') id: string) {
		await this.readNotification.execute({
			notificationId: id
		})
	}

	@Patch(':id/unread')
	async unread(@Param('id') id: string) {
		await this.unreadNotification.execute({
			notificationId: id
		})
	}

	@Post()
	async create(@Body() body: CreateNotificationBody) {
		const { recipientId, content, category } = body

		const { notification } = await this.sendNotification.execute({
			recipientId,
			content,
			category
		})

		return {
			notification: NotificationViewModel.toHTTP(notification)
		}
	}
}
