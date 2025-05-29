<?php

use App\Http\Controllers\PlantRecomendation\GetPlantRecomendationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Message\SendMessageController;
// use Illuminate\Container\Attributes\Log;
use Illuminate\Support\Facades\Log;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/plant_recomendation/analyze', [GetPlantRecomendationController::class, 'store']);


    Route::post('/message/send', SendMessageController::class);

Route::prefix('disease')->group(function () {
    Route::post('/analyze', [\App\Http\Controllers\Disease\ResultDiseaseController::class, 'analyze']);
});