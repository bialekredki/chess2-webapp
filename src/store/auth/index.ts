import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios, { AxiosResponse } from 'axios';

@Module({ namespaced: true })
class Auth extends VuexModule {
  public token = '';
  
  public permissions: Array<{[key:string]: string|number}> = [];

  @Mutation
  public setToken(newToken: string): void {
    this.token = newToken;
  }

  @Mutation
  public setPermissions(newPermissions: Array<{[key:string]: string|number}> ): void {
    this.permissions = newPermissions;
  }

  @Action
  public updateToken(newToken: string): void {
    this.context.commit('setToken', newToken);
    axios.get('/me/permissions', { headers: { Authorization: 'Bearer ' + newToken }}).then((response:AxiosResponse) => {
      this.context.commit('setPermissions', response.data)
    });
  }

  get authHeader(): string{
    return 'Bearer ' + this.token;
  }

  get permissionsIDs(): Array<number> {
    return this.permissions.map((permission) => <number>permission.id);
  }

  get canAccessAdminPanel(): boolean {
    if (this.permissionsIDs.includes(10)) return true;
    return false;
  }

  get isLoggedIn(): boolean {
      return !!this.token;
  }

  get getToken(): string {
    return this.token;
}
}
export default Auth;