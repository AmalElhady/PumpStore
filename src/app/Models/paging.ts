import { Pump } from "./pump";
import { FilterOptions } from "./FilterOptions";

export class Pagination
{
    constructor(){}
    count:number=0;
    pageIndex:number=1;
    pageSize:number=6;
    data: Pump[] = [];
    filterOptions:FilterOptions=new FilterOptions();
}