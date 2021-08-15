import { Response } from 'express';
import { QueryOrderType } from '../types/query-order.types';

export interface IBaseController<Dto> {
    create: (res: Response, body: Dto) => Promise<Response>;
    find: (res: Response, id: string) => Promise<Response>;
    query: (res: Response, limit?: number, offset?: number, order?: QueryOrderType) => Promise<Response>;
    remove: (res: Response, id: string) => Promise<Response>;
}
