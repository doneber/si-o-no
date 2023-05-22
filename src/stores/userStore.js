import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    roomId: '',
    userId: '',
  }),
  actions: {
    updateName(name) {
      this.name = name
    },
    updateRoomId(roomId) {
      this.roomId = roomId
    },
    updateUserId(userId) {
      this.userId = userId
    }
  },
  persist: true,
})
