<?php

use App\Http\Controllers\PlantRecomendation\GetPlantRecomendationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\Message\SendMessageController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/plant_recomendation/analyze', [GetPlantRecomendationController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/message/send', SendMessageController::class);
});