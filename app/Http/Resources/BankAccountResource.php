<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BankAccountResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'              => $this->id,
            'bank_name'       => $this->bank_name,
            'account_name'    => $this->account_name,
            'account_number'  => $this->account_number,
            'branch_name'     => $this->branch_name,
            'initial_balance' => $this->initial_balance,
            'current_balance' => $this->current_balance,
            'created_at'      => $this->created_at?->format('Y-m-d H:i:s'),
        ];
    }
}