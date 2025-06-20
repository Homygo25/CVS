<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{
    // Show user form
    public function create()
    {
        return view('transactions.create');
    }

    // Handle form submission
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:deposit,withdrawal',
            'amount' => 'required|numeric|min:1',
        ]);

        Transaction::create([
            'user_id' => Auth::id(),
            'type' => $request->type,
            'amount' => $request->amount,
            'status' => 'pending',
        ]);

        return back()->with('success', 'Transaction request submitted.');
    }

    // Admin: show all pending transactions
    public function adminIndex()
    {
        $transactions = Transaction::where('status', 'pending')->get();
        return view('admin.transactions.index', compact('transactions'));
    }

    // Admin: approve or deny transaction
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:approved,denied',
        ]);

        $transaction = Transaction::findOrFail($id);
        $transaction->status = $request->status;
        $transaction->admin_id = Auth::guard('admin')->id();
        $transaction->remarks = $request->remarks;
        $transaction->save();

        return back()->with('success', 'Transaction updated.');
    }
}
