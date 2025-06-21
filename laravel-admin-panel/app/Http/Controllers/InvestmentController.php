<?php

namespace App\Http\Controllers;

use App\Models\Investment;
use App\Models\InvestmentPlan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class InvestmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|exists:investment_plans,id',
            'amount' => 'required|numeric|min:1',
        ]);

        $plan = InvestmentPlan::findOrFail($request->plan_id);

        $start = Carbon::now();
        $end = $start->copy()->addDays($plan->duration_days);

        $investment = Investment::create([
            'user_id' => Auth::id(),
            'investment_plan_id' => $plan->id,
            'amount' => $request->amount,
            'start_date' => $start,
            'end_date' => $end,
        ]);

        return response()->json($investment);
    }
}
