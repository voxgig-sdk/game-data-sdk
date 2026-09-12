import { GameDataEntityBase } from '../GameDataEntityBase';
import type { GameDataSDK } from '../GameDataSDK';
import type { Control } from '../types';
import type { GetGameById, GetGameByIdListMatch } from '../GameDataTypes';
declare class GetGameByIdEntity extends GameDataEntityBase<GetGameById> {
    constructor(client: GameDataSDK, entopts: any);
    make(this: GetGameByIdEntity): GetGameByIdEntity;
    list(this: any, reqmatch?: GetGameByIdListMatch, ctrl?: Control): Promise<GetGameByIdEntity[]>;
}
export { GetGameByIdEntity };
