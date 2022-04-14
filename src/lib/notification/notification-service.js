import notificationStore from './notification-store'

export default {
	add: (message, type) => {
		notificationStore.add(message, type)
	},
	remove: (message, index) => {
		notificationStore.remove(message, index)
	},
}
