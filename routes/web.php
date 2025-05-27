<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\PlantRecomendation\GetPlantRecomendationController;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


    Route::get('/analisis-potensi-tanaman', function () {
        return Inertia::render('Analisys'); 
    })->middleware(['auth', 'verified'])->name('analisis.potensi');

    Route::get('/analisis-penyakit-tanaman', function () {
        return Inertia::render('DeteksiPenyakitTanaman'); 
    })->middleware(['auth', 'verified'])->name('analisis.penyakit');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/history-plant-recomendation', [App\Http\Controllers\PlantRecomendation\HistoryPlantRecomendationController::class, 'index'])->name('history.plant.recomendation.index');
    Route::get('/history-plant-recomendation/{id}', [App\Http\Controllers\PlantRecomendation\HistoryPlantRecomendationController::class, 'show'])->name('history.plant.recomendation.show');
    Route::delete('/history-plant-recomendation/{id}', [App\Http\Controllers\PlantRecomendation\HistoryPlantRecomendationController::class, 'destroy'])->name('history.plant.recomendation.destroy');
});

Route::prefix('plant_recomendation')->group(function () {
    Route::post('/analyze', [GetPlantRecomendationController::class, 'store'])->name('plant.recomendation.analyze');
});

require __DIR__.'/auth.php';
