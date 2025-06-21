<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Investment;
use Carbon\Carbon;

class AccrueDailyInterest extends Command
{
    protected $signature = 'app:accrue-daily-interest';

    protected $description = 'Accrues daily interest for active investments';

    public function handle()
    {
        $now = Carbon::now();
        $investments = Investment::with('plan')
            ->where('matured', false)
            ->get();

        foreach ($investments as $investment) {
            if ($now->greaterThanOrEqualTo($investment->end_date)) {
                $investment->matured = true;
            }
            $dailyRate = $investment->plan->daily_interest / 100;
            $investment->accrued_interest += $investment->amount * $dailyRate;
            $investment->save();
        }

        $this->info('Daily interest accrued.');
        return Command::SUCCESS;
    }
}
