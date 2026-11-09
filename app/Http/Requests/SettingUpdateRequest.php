<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SettingUpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; 
    }

    public function rules(): array
    {
        return [
            // General
            'system_name' => 'required|string|max:255',
            'school_name' => 'required|string|max:255',
            'system_email' => 'required|email|max:255',
            'secondary_email' => 'nullable|email|max:255',
            'system_phone' => 'required|string|max:50',
            'secondary_phone' => 'nullable|string|max:50',
            'system_address' => 'required|string|max:500',
            'website' => 'nullable|url|max:255',
            'opening_hours' => 'nullable|string|max:255',
            
            // Branding (Files)
            'system_logo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'report_logo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:2048',
            'favicon' => 'nullable|image|mimes:png,ico|max:1024',
            
            // Social Links
            'facebook_url' => 'nullable|url|max:255',
            'twitter_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'youtube_url' => 'nullable|url|max:255',
            
            // Academic
            'default_academic_year_id' => 'nullable|exists:academic_years,id',
            'date_format' => 'required|string|in:Y-m-d,d-m-Y,m/d/Y',
            'timezone' => 'required|string|max:100',
            'currency' => 'required|string|max:10',
            
            // Finance
            'tax_percentage' => 'nullable|numeric|min:0|max:100',
            'late_fee_type' => 'nullable|in:fixed,percentage',
            'late_fee_amount' => 'nullable|numeric|min:0',
            'receipt_footer' => 'nullable|string|max:1000',
            
            // Communication
            'sms_api_url' => 'nullable|url|max:255',
            'sms_api_key' => 'nullable|string|max:255',
            'sms_sender_id' => 'nullable|string|max:50',
            'smtp_host' => 'nullable|string|max:255',
            'smtp_port' => 'nullable|string|max:10',
            'smtp_username' => 'nullable|string|max:255',
            'smtp_password' => 'nullable|string|max:255',
        ];
    }
}