import { ref } from "vue"
import type { Ref } from "vue"
import { useTokenStore } from '@/stores/useTokenStore'
import { router } from '@/router';
import { getTokenAuthorization, getURLApi } from "@/utils/helpers/helper-api"

export default class AuthService {
    private token: Ref<string>
    private error: Ref<string | null>


    constructor() {
        this.token = ref('')
        this.error = ref('')
    }
    // getToken() {
    //     return this.token
    // }
    getError() {
        return this.error
    }
    getCompanys() {
        return useTokenStore().companys ?? []
    }
    logout() {
        useTokenStore().logout()
    }

    async login(email: string, pass: string): Promise<void> {
        try {
            const urlapi = getURLApi()
            this.error.value = ""
            this.token.value = "";
            const rest = await fetch(`${urlapi}/Auth/Login`, {
                method: 'POST',
                headers: {
                    'Authorization': getTokenAuthorization(),
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }, body: JSON.stringify({
                    "email": email,
                    "password": pass,
                    "isvendor": false
                })
            })
            const response = await rest.json()
            if (response.errors.length > 0) {
                this.error.value = response.errors.join()
            } else {
                useTokenStore().setResultLogin(response.data[0])
            }
        } catch (e: any) {
            this.error.value = e.message
            console.error(e)
        }
    }
    async selectcompany(id: string): Promise<void> {
        try {
            this.error.value = ""
            this.token.value = "";
            const tokenlogin = useTokenStore().getToken ?? "";
            const rest = await fetch(`${getURLApi()}/Auth/SelectCompany?compyid=${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': getTokenAuthorization(),
                    'TokenLogin': tokenlogin,
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const response = await rest.json()
            if (response.errors.length > 0) {
                this.error.value = response.errors.join()
            } else {
                useTokenStore().setLogin(response.data[0])
                router.push({ name: 'Default' });
            }
        } catch (e: any) {
            this.error.value = e.message
            console.error(e)
        }
    }
}
AuthService