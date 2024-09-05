import { defineStore } from "pinia"

export const crudActions = defineStore('crud', {
    state: () => ({
      modelData: null,
      
      // ...
    }),
  
    actions: {
      async addRow(row:any) {
        try {
          this.modelData=row
          //showTooltip(`Welcome back ${this.userData.name}!`)
        } catch (error) {
          //showTooltip(error)
          // let the form component display the error
          return error
        }
      },
    },
  })