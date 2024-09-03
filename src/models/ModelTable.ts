export interface IModelTable {
  loading: boolean
  itemsPerPage?: number
  totalrows?: number
  search?: string
  headers: any[]
  items: any
}

export class ModelTable implements IModelTable {

  loading: boolean;
  itemsPerPage?: number;
  totalrows?: number;
  search?: string;
  headers: any[];
  items: any;
  constructor(headers: any) {
    this.loading = true;
    this.items = [];
    this.totalrows=0;
    this.search=""
    this.itemsPerPage = 50;
    this.headers = headers ?? new Array();
    

  }
}
