import {IOrder} from './i-order';

export class QueryBase {
	take?: number;
	skip?: number;
	order?: IOrder[];
	withCount = true;
}

export class Query<TFilter> extends QueryBase {
	filter?: TFilter;
}


