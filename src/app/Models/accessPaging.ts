import { Accessories } from "./accessories";
import { AccessFilterOptions } from "./AccessFilterOptions";

export class Pagination
{
    constructor(){}
    count:number=0;
    pageIndex:number=1;
    pageSize:number=6;
    data: Accessories[] = [];
    accessFilterOptions:AccessFilterOptions=new AccessFilterOptions();
}