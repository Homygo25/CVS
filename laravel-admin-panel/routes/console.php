<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Console\Commands\AccrueDailyInterest;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('accrue:daily', function () {
    $this->call(AccrueDailyInterest::class);
})->purpose('Manually run daily interest accrual');

Schedule::command(AccrueDailyInterest::class)->daily();
