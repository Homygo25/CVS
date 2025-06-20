<!DOCTYPE html>
<html>
<head>
    <title>Make a Transaction</title>
</head>
<body>
    <h2>Deposit / Withdrawal Form</h2>

    @if(session('success'))
        <p style="color:green;">{{ session('success') }}</p>
    @endif

    <form method="POST" action="{{ route('transactions.store') }}">
        @csrf
        <label>Type:</label>
        <select name="type" required>
            <option value="deposit">Deposit</option>
            <option value="withdrawal">Withdrawal</option>
        </select><br><br>

        <label>Amount:</label>
        <input type="number" step="0.01" name="amount" required><br><br>

        <button type="submit">Submit</button>
    </form>
</body>
</html>
