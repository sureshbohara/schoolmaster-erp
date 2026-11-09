<?php

namespace App\Http\Controllers;

use App\Http\Requests\SettingUpdateRequest;
use App\Models\AcademicYear;
use App\Services\SettingService;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
  
  
    public function __construct(protected SettingService $settingService) {}


    public function index(): Response
    {
        $settings = $this->settingService->getAllSettings();
        $academicYears = AcademicYear::where('status', 'active')->get(['id', 'title']);

        return Inertia::render('Settings/Index', [
            'settings' => $settings,
            'academicYears' => $academicYears,
        ]);
    }


    public function update(SettingUpdateRequest $request){
        $this->settingService->updateSettings($request->validated());
        return redirect()->route('settings.index')->with('success', 'System settings updated successfully!');
    }

}