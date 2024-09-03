import { ComparisonOperators, LogicalOperators, type ListModelFilter, type ListModelSort } from "@/interfaces/IResultBase";
import { useTokenStore } from "@/stores/useTokenStore";
import { getTokenAuthorization, getURLApi } from "@/utils/helpers/helper-api";
import { ref } from "vue"
import type { Ref } from "vue"


export default class BaseApiServices {
    private baseapi: Ref<string>
    private tokenlogin = ""
    private data: any = []
    private pagination: any = {}
    constructor(api: string) {
        this.baseapi = ref(api)
        this.tokenlogin = useTokenStore().getTokenLogin ?? "";
    }
    getData = () => this.data;
    getPagination = () => this.pagination;
    protected geturl() {
        return `${getURLApi()}/${this.baseapi.value}`
    }
    protected getheaders() {
        console.log(getTokenAuthorization())
        console.log(this.tokenlogin)
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
        let url = `${this.geturl()}/GetAll?limit=${limit}&page=${page}`
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
                    Type: el.order.toUpperCase()
                })
            });
            url += `&sort=${encodeURIComponent(JSON.stringify(sorts))}`
        }
        const _header = this.getheaders();
        console.log(_header)
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
}