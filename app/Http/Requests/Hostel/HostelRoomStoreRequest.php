<?php

namespace App\Http\Requests\Hostel;

use Illuminate\Foundation\Http\FormRequest;

class HostelRoomStoreRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'hostel_id'    => ['required', 'exists:hostels,id'],
            'room_no'      => ['required', 'string', 'max:20'],
            'room_type'    => ['required', 'in:single,double,triple,dormitory'],
            'cost_per_bed' => ['nullable', 'numeric', 'min:0'],
            'no_of_beds'   => ['nullable', 'integer', 'min:0'],
            'description'  => ['nullable', 'string'],
            'status'       => ['required', 'in:active,inactive,full'],
        ];
    }
}