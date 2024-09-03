export interface IResultBase<T> {
  errors: string[];
  infoerror?: Infoerror[];
  data: T[];
}

export interface Infoerror {
  number: number;

}


export interface IResultApiPagination<T> {
  errors: string[];
  infoerror?: Infoerror[];
  data: T[];
  pagination: IModelPagination
}

export interface IModelPagination {
  page: number,
  limit: number,
  totalrows: number,
  totalpages: number
}

export interface IModelFilter {
  Field: string,
  Value: any,
  Logical: LogicalOperators,
  Comparison: ComparisonOperators
}
export type ListModelFilter = Array<IModelFilter>

export type IModelSort = {
  Field: string,
  Type: string
}
export type ListModelSort = Array<IModelSort>

export enum LogicalOperators {
  AND,
  OR,
  NOT
}
export enum ComparisonOperators {
  //
  // Summary:
  //     Igual
  EQUAL,
  //
  // Summary:
  //     Mayor Que
  GREATERTHAN,
  //
  // Summary:
  //     Menor Que
  LESSTHAN,
  //
  // Summary:
  //     Diferente
  DIFFERENT,
  //
  // Summary:
  //     Mayor o Igual Que
  GREATERTHANOREQUAL,
  //
  // Summary:
  //     Menor o Igual que
  LESSTHANOREQUAL,
  //
  // Summary:
  //     Like
  LIKE,
  //
  // Summary:
  //     In
  IN,
  //
  // Summary:
  //     Entre
  BETWEEN
}



