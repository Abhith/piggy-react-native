import { clear } from "../../lib/storage"
import { RootStore } from "../../models/root-store"

export type GetRootStore = () => RootStore

export const commandMiddleware = (getRootStore: GetRootStore) => {
  return tron => {
    return {
      onCommand: async command => {
        if (command.type !== "custom") return
        switch (command.payload) {
          case "resetStore":
            console.tron.log("resetting store")
            clear()
            break
          case "resetNavigation":
            console.tron.log("resetting navigation store")
            getRootStore().navigationStore.reset()
            break
          // case "transactions":
          //   console.tron.log("fetching transactions...")
          //   const root = getRootStore()
          //   root.transactionStore.loadTodos()
          //   root.navigationStore.navigateTo("toDoList")
        }
      },
    }
  }
}
