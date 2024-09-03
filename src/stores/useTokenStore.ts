import type { IResultAuth } from '@/interfaces/IResultAuth'
import type { IResultLogin } from '@/interfaces/IResultLogin'
import { router } from '@/router'
// import { defineStore } from 'pinia'


export default class useTokenStore {

  public get getToken() {
    return this.InfoLogin?.token
  }
  public get name() {
    return this.InfoAuth?.name;
  }
  public get email() {

    return this.InfoLogin?.email
  }
  public get getTokenLogin() {
    return this.InfoAuth?.token
  }
  public get isAuthenticated() {

    return (this.InfoAuth?.token ?? "").length > 0

  }

  public get isSelectCompany() {

    return (this.InfoAuth?.token ?? "").length > 0

  }
  public get getCompany() {

    return this.InfoAuth?.namecompany ?? ""

  }

  public get companys() {
    return this.InfoLogin?.companys ?? []
  }

  protected get InfoLogin(): IResultLogin | null {

    const _resultjson = sessionStorage.getItem('infologin')
    if (_resultjson != null && _resultjson.length > 0) {
      return JSON.parse(_resultjson)
    }
    return null
  }
  protected get InfoAuth(): IResultAuth | null {

    const _resultjson = sessionStorage.getItem('infoauth')
    if (_resultjson != null && _resultjson.length > 0) {
      return JSON.parse(_resultjson)
    }
    return null
  }
  public setResultLogin(resultlogin: IResultLogin | null) {
    sessionStorage.setItem('infologin', JSON.stringify(resultlogin))
    sessionStorage.removeItem('infoauth')
  }
  public setLogin(resultlogin: IResultAuth | null) {
    sessionStorage.removeItem('infologin')
    sessionStorage.setItem('infoauth', JSON.stringify(resultlogin))

  }
  public logout(redirect?: boolean) {

    sessionStorage.removeItem('infoauth')
    sessionStorage.removeItem('infologin')

    if ((redirect ?? false)) {
      router.push({ name: "Login" });
    }
  }



}
