import { GetGameByIdEntity } from './entity/GetGameByIdEntity';
import { PopularEntity } from './entity/PopularEntity';
export type * from './GameDataTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { GameDataEntityBase } from './GameDataEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class GameDataSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    GetGameById(entopts?: Record<string, any>): GetGameByIdEntity;
    Popular(entopts?: Record<string, any>): PopularEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): GameDataSDK;
    tester(testopts?: any, sdkopts?: any): GameDataSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof GameDataSDK;
export { stdutil, config, BaseFeature, GameDataEntityBase, GameDataSDK, SDK, };
