<?php

namespace Database\Seeders;

use App\Models\BankAccount;
use Illuminate\Database\Seeder;

class BankAccountSeeder extends Seeder
{
    public function run(): void
    {
        $accounts = [
            [
                'bank_name'       => 'Nepal Rastra Bank',
                'account_name'    => 'Kathmandu International School - Main',
                'account_number'  => '00101234567890',
                'branch_name'     => 'Baluwatar, Kathmandu',
                'initial_balance' => 5000000.00,
                'current_balance' => 5000000.00,
            ],
            [
                'bank_name'       => 'Global IME Bank',
                'account_name'    => 'Kathmandu International School - Savings',
                'account_number'  => '02301234567890',
                'branch_name'     => 'Lazimpat, Kathmandu',
                'initial_balance' => 2000000.00,
                'current_balance' => 2000000.00,
            ],
            [
                'bank_name'       => 'Cash in Hand',
                'account_name'    => 'School Cash Account',
                'account_number'  => 'CASH-001',
                'branch_name'     => 'Main Office',
                'initial_balance' => 500000.00,
                'current_balance' => 500000.00,
            ],
        ];

        foreach ($accounts as $account) {
            BankAccount::updateOrCreate(
                ['account_number' => $account['account_number']],
                $account
            );
        }
    }
}