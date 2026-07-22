<?php
declare(strict_types=1);

// GameData SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

GameDataUtility::setRegistrar(function (GameDataUtility $u): void {
    $u->clean = [GameDataClean::class, 'call'];
    $u->done = [GameDataDone::class, 'call'];
    $u->make_error = [GameDataMakeError::class, 'call'];
    $u->feature_add = [GameDataFeatureAdd::class, 'call'];
    $u->feature_hook = [GameDataFeatureHook::class, 'call'];
    $u->feature_init = [GameDataFeatureInit::class, 'call'];
    $u->fetcher = [GameDataFetcher::class, 'call'];
    $u->make_fetch_def = [GameDataMakeFetchDef::class, 'call'];
    $u->make_context = [GameDataMakeContext::class, 'call'];
    $u->make_options = [GameDataMakeOptions::class, 'call'];
    $u->make_request = [GameDataMakeRequest::class, 'call'];
    $u->make_response = [GameDataMakeResponse::class, 'call'];
    $u->make_result = [GameDataMakeResult::class, 'call'];
    $u->make_point = [GameDataMakePoint::class, 'call'];
    $u->make_spec = [GameDataMakeSpec::class, 'call'];
    $u->make_url = [GameDataMakeUrl::class, 'call'];
    $u->param = [GameDataParam::class, 'call'];
    $u->prepare_auth = [GameDataPrepareAuth::class, 'call'];
    $u->prepare_body = [GameDataPrepareBody::class, 'call'];
    $u->prepare_headers = [GameDataPrepareHeaders::class, 'call'];
    $u->prepare_method = [GameDataPrepareMethod::class, 'call'];
    $u->prepare_params = [GameDataPrepareParams::class, 'call'];
    $u->prepare_path = [GameDataPreparePath::class, 'call'];
    $u->prepare_query = [GameDataPrepareQuery::class, 'call'];
    $u->result_basic = [GameDataResultBasic::class, 'call'];
    $u->result_body = [GameDataResultBody::class, 'call'];
    $u->result_headers = [GameDataResultHeaders::class, 'call'];
    $u->transform_request = [GameDataTransformRequest::class, 'call'];
    $u->transform_response = [GameDataTransformResponse::class, 'call'];
});
