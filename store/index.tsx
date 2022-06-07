import { makeAutoObservable } from "mobx";

interface IUser {
    name: string,
    gitURL: string,
    gitUsername: string,
}

class Store {
    user?: IUser
    navTabIndex: number = 0;
    openDrawer: boolean = false;
    constructor() {
        makeAutoObservable(this);
    }
    setTabIndex(newIndex: number) {
        this.navTabIndex = newIndex;
    }
    toggleDrawer(drawerState?: boolean) {
        if (drawerState) this.openDrawer = drawerState
        else this.openDrawer = !this.openDrawer;
    }
}

export default new Store();
