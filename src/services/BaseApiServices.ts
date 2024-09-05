import { ComparisonOperators, LogicalOperators, type ListModelFilter, type ListModelSort } from "@/interfaces/IResultBase";
import useTokenStore from "@/stores/useTokenStore";
import { getTokenAuthorization, getURLApi } from "@/utils/helpers/helper-api";
import { ref } from "vue"
import type { Ref } from "vue"


export default class BaseApiServices {
    private baseapi: Ref<string>
    private tokenlogin = ""
    private data: any = []
    private pagination: any = {}
    private endpointgetAll: string = "GetAll"
    private endpointget: string = "Get"
    private endpointupdate: string = "Update"
    private endpointadd: string = "Add"
    // public constructor(api: string) {
    //     this.baseapi = ref(api)
    //     this.tokenlogin = new useTokenStore().getTokenLogin ?? "";
    // }
    public constructor(api: string, endpointgetAll?: string) {
        this.baseapi = ref(api)
        this.tokenlogin = new useTokenStore().getTokenLogin ?? "";
        this.endpointgetAll = endpointgetAll ?? "GetAll";
    }


    getData = () => this.data;
    getPagination = () => this.pagination;
    protected geturl() {
        return `${getURLApi()}/${this.baseapi.value}`
    }
    protected getheaders() {

        return {
            'Authorization': getTokenAuthorization(),
            'TokenLogin': this.tokenlogin,
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    async getAll(filter?: ListModelFilter | null, sort?: any | null, search?: string, limit?: number, page?: number): Promise<void> {
        if (limit == null) limit = 50
        if (page == null) page = 1
        if (limit <= 0) limit = 50
        if (page <= 0) page = 1
        let url = `${this.geturl()}/${this.endpointgetAll}?limit=${limit}&page=${page}`
        search ??= ""
        if (search.length > 0) {

            if (filter == null) filter = []
            filter.push({
                Field: "searchinallfield",
                Value: search,
                Logical: LogicalOperators.AND,
                Comparison: ComparisonOperators.LIKE
            })
        }
        if (filter != null) {
            url += `&filter=${encodeURIComponent(JSON.stringify(filter))}`
        }
        if (sort != null && sort.length > 0) {
            let sorts: ListModelSort = []
            sort.forEach((el: { key: string; order: string; }) => {
                sorts.push({
                    Field: el.key,
                    Type: el.order
                })
            });
            url += `&sort=${encodeURIComponent(JSON.stringify(sorts))}`
        }
        const _header = this.getheaders();

        const rest = await fetch(url, {
            method: 'GET',
            headers: this.getheaders()
        })

        const response = await rest.json()
        if (response.errors.length > 0) {
            this.data = []
            throw new Error(response.errors.join("<br>"))
        }
        this.data = response.data
        this.pagination = response.pagination
    }
    async getbyId(id: string, endpoint?: string | null): Promise<void> {

        let url = `${this.geturl()}/${this.endpointget ?? endpoint}/?id=${id}`

        const _header = this.getheaders();

        const rest = await fetch(url, {
            method: 'GET',
            headers: this.getheaders()
        })

        const response = await rest.json()
        if (response.errors.length > 0) {
            this.data = []
            throw new Error(response.errors.join("<br>"))
        }

        this.data = response.data[0]

    }

    async Update(model: any, endpoint?: string | null): Promise<void> {

        let url = `${this.geturl()}/${this.endpointupdate ?? endpoint}`

        const _header = this.getheaders();

        const rest = await fetch(url, {
            method: 'PUT',
            headers: this.getheaders(),
            body: JSON.stringify(model),
        })

        const response = await rest.json()
        if (response.errors.length > 0) {
            this.data = null
            this.geterrors(response.errors)
        }

        this.data = response.data[0]

    }
    async Add(model: any, endpoint?: string | null): Promise<void> {

        let url = `${this.geturl()}/${this.endpointadd ?? endpoint}`

        const _header = this.getheaders();

        const rest = await fetch(url, {
            method: 'POST',
            headers: this.getheaders(),
            body: JSON.stringify(model),
        })

        const response = await rest.json()
        if (response.errors.length > 0) {
            this.data = null
            this.geterrors(response.errors)
        }

        this.data = response.data[0]

    }
    protected geterrors(error: any) {
        if (error.length > 0) {
            let errors: any = []
            for (let index = 0; index < error.length; index++) {
                const el = error[index];
                if (el.hasOwnProperty("Message")) {
                    if (el.hasOwnProperty("Field")) {
                        errors.push(`${el.Field} - ${el.Message}`)
                    } else {
                        errors.push(el.Message)
                    }
                } else {
                    errors.push(el.toString())
                }
            }

            throw new Error(errors.join("<br>"))
        } else {
            throw new Error(error.join("<br>"))
        }
    }
}