<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
use App\Http\Controllers\InvestmentController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/invest', [InvestmentController::class, 'store']);
});
