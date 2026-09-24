"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('GetGameByIdEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when GAME_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('GAME_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.GameDataSDK.test();
        const ent = testsdk.GetGameById();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.GAME_DATA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_game_by_id.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "id": { "a": true, "h": "Id", "n": "id", "r": false, "t": "`$STRING`", "key$": "id", "index$": 0 }, "source": { "a": true, "h": "Source", "n": "source", "r": false, "sh": "Download source (e.g., FitGirl)", "t": "`$STRING`", "key$": "source", "index$": 1 }, "url": { "a": true, "fo": "uri", "h": "Url", "n": "url", "r": false, "t": "`$STRING`", "key$": "url", "index$": 2 } }, "id": { "field": "id", "name": "id" }, "name": "get_game_by_id", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "570", "k": "param", "n": "id", "or": "id", "r": true, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/{id}", "q": { "exist": ["id"] }, "r": {}, "s": [{ "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "get_game_by_id", "name__orig": "get_game_by_id", "Name": "GetGameById", "name_": "get_game_by_id", "name-": "get-game-by-id", "NAME": "GET_GAME_BY_ID", "index$": 0 }, { "active": true, "entity": "get_game_by_id", "key$": "BasicGetGameByIdFlow", "kind": "basic", "name": "BasicGetGameByIdFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "get_game_by_id_ref01" } }], "index$": 0 }] }, 'GetGameById', { "GET /{id}": { "protocol": "http", "operationId": "getGameById", "responses": { "200": { "description": "Successfully retrieved game details", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "description": "Steam App ID", "key$": "id", "type": "string" }, "name": { "description": "Game title", "key$": "name", "type": "string" }, "description": { "description": "Detailed game description from Steam", "key$": "description", "type": "string" }, "shortDescription": { "description": "Short game description", "key$": "shortDescription", "type": "string" }, "headerImage": { "description": "URL to game header image", "format": "uri", "key$": "headerImage", "type": "string" }, "screenshots": { "description": "Array of screenshot URLs", "items": { "format": "uri", "type": "string" }, "key$": "screenshots", "type": "array" }, "developers": { "description": "List of game developers", "items": { "type": "string" }, "key$": "developers", "type": "array" }, "publishers": { "description": "List of game publishers", "items": { "type": "string" }, "key$": "publishers", "type": "array" }, "genres": { "description": "Game genres", "items": { "type": "string" }, "key$": "genres", "type": "array" }, "releaseDate": { "description": "Game release date", "key$": "releaseDate", "type": "string" }, "platforms": { "key$": "platforms", "properties": { "linux": { "type": "boolean" }, "mac": { "type": "boolean" }, "windows": { "type": "boolean" } }, "type": "object" }, "downloadLinks": { "description": "Download links from FitGirl Repacks", "items": { "properties": { "source": { "description": "Download source (e.g., FitGirl)", "type": "string", "key$": "source" }, "url": { "format": "uri", "type": "string", "key$": "url" } }, "type": "object", "index$": 0 }, "key$": "downloadLinks", "type": "array" } }, "x-ref": "#/components/schemas/GameDetail" } } } }, "404": { "description": "Game not found", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "integer", "description": "Error code" } }, "x-ref": "#/components/schemas/Error" } } } }, "500": { "description": "Internal server error", "content": { "application/json": { "schema": { "type": "object", "properties": { "error": { "type": "string", "description": "Error message" }, "code": { "type": "integer", "description": "Error code" } }, "x-ref": "#/components/schemas/Error" } } } } }, "parameters": [{ "name": "id", "in": "path", "required": true, "description": "The official Steam App ID. Find IDs on SteamDB.", "schema": { "type": "string" }, "example": "570", "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_game_by_id_ref01_data = Object.values(setup.data.existing.get_game_by_id)[0];
        // LIST
        const get_game_by_id_ref01_ent = client.GetGameById();
        const get_game_by_id_ref01_match = {};
        const get_game_by_id_ref01_list = (await get_game_by_id_ref01_ent.list(get_game_by_id_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_game_by_id/GetGameByIdTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.GameDataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_game_by_id01', 'get_game_by_id02', 'get_game_by_id03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'GAME_DATA_TEST_GET_GAME_BY_ID_ENTID': idmap,
        'GAME_DATA_TEST_LIVE': 'FALSE',
        'GAME_DATA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['GAME_DATA_TEST_GET_GAME_BY_ID_ENTID'];
    const live = 'TRUE' === env.GAME_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['GAME_DATA_TEST_GET_GAME_BY_ID_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.GameDataSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.GAME_DATA_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=GetGameByIdEntity.test.js.map