<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InvestmentPlan extends Model
{
    protected $fillable = [
        'name',
        'daily_interest',
        'duration_days',
        'min_investment',
        'max_investment',
    ];
}
