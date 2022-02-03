import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import axios, { AxiosResponse } from 'axios';

@Module({ namespaced: true })
class Auth extends VuexModule {
  public name = '';
  
  public permissions: Array<{[key:string]: string|number}> = [];

  @Mutation
  public setName(newName: string): void {
    this.name = newName;
  }

  @Mutation
  public setPermissions(newPermissions: Array<{[key:string]: string|number}> ): void {
    this.permissions = newPermissions;
  }

  @Action
  public updateName(newName: string): void {
    this.context.commit('setToken', newName);
  }

  get permissionsIDs(): Array<number> {
    return this.permissions.map((permission) => <number>permission.id);
  }

  get canAccessAdminPanel(): boolean {
    if (this.permissionsIDs.includes(10)) return true;
    return false;
  }

  get getName(): string {
    return this.name;
}
}
export default Auth;