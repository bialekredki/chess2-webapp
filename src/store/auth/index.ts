import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios, { AxiosResponse } from 'axios';

@Module({ namespaced: true })
class Auth extends VuexModule {
  public token = '';

  @Mutation
  public setToken(newToken: string): void {
    this.token = newToken;
  }

  @Action
  public updateToken(newToken: string): void {
    this.context.commit('setToken', newToken);
    axios.get('/me/info/basic', { headers: { Authorization: 'Bearer ' + newToken }}).then((response:AxiosResponse) => {
      this.context.commit('user/setPermissions', response.data.permissions, { root: true });
      this.context.commit('user/setName', response.data.name, { root: true });
    });
  }

  get authHeader(): string{
    return 'Bearer ' + this.token;
  }

  get isLoggedIn(): boolean {
      return !!this.token;
  }

  get getToken(): string {
    return this.token;
}
}
export default Auth;