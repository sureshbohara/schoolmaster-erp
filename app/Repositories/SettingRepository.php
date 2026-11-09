<?php

namespace App\Repositories;

use App\Models\Setting;

class SettingRepository
{
   
    public function getAll(): array
    {
        return Setting::pluck('value', 'key')->toArray();
    }

    
    public function updateOrCreate(string $key, mixed $value): Setting
    {
        return Setting::updateOrCreate(['key' => $key], ['value' => $value]);
    }
}