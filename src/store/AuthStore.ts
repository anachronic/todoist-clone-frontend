import { observable, action, runInAction } from 'mobx'

export class AuthStore {
  @observable isAuthenticated = false
  @observable token: string | null = null

  @action
  authenticate(token: string): void {
    this.isAuthenticated = true
    this.token = token
  }

  @action
  reset(): void {
    this.isAuthenticated = false
    this.token = null
  }

  @action
  async logout(): Promise<void> {
    await fetch('http://localhost:4000/sessions/refresh-token', {
      method: 'DELETE',
      credentials: 'include',
    })

    runInAction(() => {
      this.reset()
    })
  }

  @action
  async requestNewAccessToken(): Promise<void> {
    const response = await fetch(
      'http://localhost:4000/sessions/refresh-token',
      {
        method: 'POST',
        credentials: 'include',
      }
    )

    const { accessToken } = await response.json()
    runInAction(() => {
      if (accessToken) {
        this.authenticate(accessToken)
      } else {
        this.reset()
      }
    })
  }
}

export const authStore = new AuthStore()
