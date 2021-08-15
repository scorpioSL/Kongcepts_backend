import { QueryOrderType } from '../types/query-order.types';

export interface IBaseService<Dto, ResponseType> {
    create: (body: Dto) => Promise<ResponseType>;
    find: (id: string) => Promise<ResponseType>;
    query: (limit?: number, offset?: number, order?: QueryOrderType) => Promise<Array<ResponseType>>;
    remove: (id: string) => Promise<ResponseType>;
}
