<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomepageController;
use App\Http\Controllers\TourScheduleController;

use App\Http\Controllers\LeadController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::get('/homepage', [HomepageController::class, 'index']);
    Route::get('/tours', [\App\Http\Controllers\TourController::class, 'index']);
    Route::get('/tours/{slug}', [\App\Http\Controllers\TourController::class, 'show']);
    Route::get('/tour-schedules', [TourScheduleController::class, 'index']);
    Route::post('/leads', [LeadController::class, 'store']);
    Route::get('/settings', [\App\Http\Controllers\SettingController::class, 'index']);
    Route::get('/gallery', [\App\Http\Controllers\GalleryController::class, 'index']);
    Route::get('/blogs', [\App\Http\Controllers\BlogController::class, 'index']);
    Route::get('/blogs/{slug}', [\App\Http\Controllers\BlogController::class, 'show']);
    Route::get('/cabins', [\App\Http\Controllers\CabinCategoryController::class, 'index']);
    Route::get('/destinations', [\App\Http\Controllers\DestinationController::class, 'index']);
});
