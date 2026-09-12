import { GameDataEntityBase } from '../GameDataEntityBase';
import type { GameDataSDK } from '../GameDataSDK';
import type { Control } from '../types';
import type { Popular, PopularListMatch } from '../GameDataTypes';
declare class PopularEntity extends GameDataEntityBase<Popular> {
    constructor(client: GameDataSDK, entopts: any);
    make(this: PopularEntity): PopularEntity;
    list(this: any, reqmatch?: PopularListMatch, ctrl?: Control): Promise<PopularEntity[]>;
}
export { PopularEntity };
