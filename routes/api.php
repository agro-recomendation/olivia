<?php

use App\Http\Controllers\PlantRecomendation\GetPlantRecomendationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/plant_recomendation/analyze', [GetPlantRecomendationController::class, 'store']);
