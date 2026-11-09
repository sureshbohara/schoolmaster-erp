<?php

namespace App\Services;

use App\Repositories\SettingRepository;
use Illuminate\Http\UploadedFile;

class SettingService
{
    public function __construct(protected SettingRepository $repository) {}

  
    public function getAllSettings(): array
    {
        $settings = $this->repository->getAll();
        
        return [
            'system_name' => $settings['system_name'] ?? 'SchoolMaster ERP',
            'school_name' => $settings['school_name'] ?? 'Sunrise Secondary School',
            'system_email' => $settings['system_email'] ?? 'info@school.com',
            'secondary_email' => $settings['secondary_email'] ?? '',
            'system_phone' => $settings['system_phone'] ?? '+977-1-4XXXXXX',
            'secondary_phone' => $settings['secondary_phone'] ?? '',
            'system_address' => $settings['system_address'] ?? 'Kathmandu, Nepal',
            'website' => $settings['website'] ?? 'www.school.com',
            'opening_hours' => $settings['opening_hours'] ?? 'Mon - Fri: 9:00 AM - 5:00 PM',
            
            'system_logo' => $settings['system_logo'] ?? null,
            'report_logo' => $settings['report_logo'] ?? null,
            'favicon' => $settings['favicon'] ?? null,
            
            'facebook_url' => $settings['facebook_url'] ?? '',
            'twitter_url' => $settings['twitter_url'] ?? '',
            'instagram_url' => $settings['instagram_url'] ?? '',
            'linkedin_url' => $settings['linkedin_url'] ?? '',
            'youtube_url' => $settings['youtube_url'] ?? '',
            
            'default_academic_year_id' => $settings['default_academic_year_id'] ?? '',
            'date_format' => $settings['date_format'] ?? 'Y-m-d',
            'timezone' => $settings['timezone'] ?? 'Asia/Kathmandu',
            'currency' => $settings['currency'] ?? 'NPR',
            
            'tax_percentage' => $settings['tax_percentage'] ?? '0',
            'late_fee_type' => $settings['late_fee_type'] ?? 'fixed',
            'late_fee_amount' => $settings['late_fee_amount'] ?? '0',
            'receipt_footer' => $settings['receipt_footer'] ?? 'This is a computer-generated receipt.',
            
            'sms_api_url' => $settings['sms_api_url'] ?? '',
            'sms_api_key' => $settings['sms_api_key'] ?? '',
            'sms_sender_id' => $settings['sms_sender_id'] ?? 'SCHOOL',
            
            'smtp_host' => $settings['smtp_host'] ?? 'smtp.gmail.com',
            'smtp_port' => $settings['smtp_port'] ?? '587',
            'smtp_username' => $settings['smtp_username'] ?? '',
            'smtp_password' => $settings['smtp_password'] ?? '',
        ];
    }

   
    public function updateSettings(array $data): void
    {
        $fileFields = ['system_logo', 'report_logo', 'favicon'];
        
        foreach ($fileFields as $field) {
            if (isset($data[$field]) && $data[$field] instanceof UploadedFile) {
                $data[$field] = $data[$field]->store('settings/logos', 'public');
            } else {
                unset($data[$field]);
            }
        }

        foreach ($data as $key => $value) {
            if ($value !== null && $value !== '') {
                $this->repository->updateOrCreate($key, $value);
            }
        }
    }
}