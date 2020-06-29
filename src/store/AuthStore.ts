import { observable, action } from 'mobx'

export interface UserData {
  [key: string]: unknown
}

export class AuthStore {
  @observable isAuthenticated = false
  @observable userData: UserData = {}
  @observable token: string | null = null

  @action
  authenticate(token: string): void {
    this.isAuthenticated = true

    // parse token somehow
    this.token = token
    this.userData = {}
  }

  @action
  logout(): void {
    this.isAuthenticated = false
    this.token = null
    this.userData = {}
  }
}
