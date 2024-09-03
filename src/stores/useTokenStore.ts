import type { IResultAuth } from '@/interfaces/IResultAuth'
import type { IResultLogin } from '@/interfaces/IResultLogin'
import { router } from '@/router'
import { defineStore } from 'pinia'


export const useTokenStore = defineStore({
  id: 'tokenStore',
  state: () => (
    { result: null } as unknown as IResultLogin
  ),
  getters: {
    getToken: (state) => {
      return sessionStorage.getItem('_token')
    }
    ,
    getTokenLogin: (state) => {
      return sessionStorage.getItem('_tokenlogin')?.toString()
    },
    isAuthenticated: (state) => {
      const _token = sessionStorage.getItem('_token')
      return (_token != null && _token.length > 0)
    },
    isSelectCompany: (state) => {
      const _token = sessionStorage.getItem('_tokenlogin')
      return (_token != null && _token.length > 0)
    },
    getCompany: (state) => {
      const _resultjson = sessionStorage.getItem('infotoken')
      if (_resultjson != null && _resultjson.length > 0){
        return JSON.parse(_resultjson).name
      }
      return ""
    }
  },
  actions: {
    setResultLogin(resultlogin: IResultLogin | null) {
      this.companys = resultlogin?.companys
      this.email = resultlogin?.email
      this.token = resultlogin?.token

      sessionStorage.setItem('_token', resultlogin?.token ?? "")
      sessionStorage.removeItem('_tokenlogin')
    },
    setLogin(resultlogin: IResultAuth | null) {

      this.email = resultlogin?.email
      this.token = resultlogin?.token
      sessionStorage.removeItem('_token')
      sessionStorage.setItem('_tokenlogin', this.token ?? "")
      sessionStorage.setItem('infotoken', JSON.stringify(resultlogin))

    },
    logout(redirect?: boolean) {
      this.email = ""
      this.token = ""
      this.companys = []
      sessionStorage.removeItem('_tokenlogin')
      sessionStorage.removeItem('_token')
      sessionStorage.removeItem('infotoken')

      if ((redirect ?? false)) {
        router.push({ name: "Login" });
      }
    }


  }
})