<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Student ID Card</title>
    <style>
        body { font-family: 'DejaVu Sans', sans-serif; margin: 0; padding: 0; background: #fff; }
        .card { width: 240px; height: 380px; border: 2px solid #0ea5e9; border-radius: 10px; padding: 15px; text-align: center; position: relative; margin: 10px auto; background: #f8fafc; }
        .header { background: #0ea5e9; color: white; padding: 8px; border-radius: 6px 6px 0 0; margin: -15px -15px 10px -15px; }
        .header h2 { margin: 0; font-size: 14px; text-transform: uppercase; }
        .header p { margin: 2px 0 0; font-size: 9px; opacity: 0.9; }
        .photo { width: 90px; height: 110px; border: 2px solid #cbd5e1; border-radius: 6px; object-fit: cover; margin: 0 auto 10px; background: #e2e8f0; }
        .name { font-size: 16px; font-weight: bold; color: #0f172a; margin: 5px 0; }
        .admission { font-size: 11px; color: #64748b; margin-bottom: 10px; }
        .details { text-align: left; font-size: 11px; color: #334155; line-height: 1.6; padding: 0 10px; }
        .details strong { color: #0f172a; display: inline-block; width: 70px; }
        .footer { position: absolute; bottom: 10px; left: 0; right: 0; text-align: center; font-size: 8px; color: #64748b; border-top: 1px dashed #cbd5e1; padding-top: 8px; margin: 0 15px; }
    </style>
</head>
<body>
    <div class="card">
        <div class="header">
            @if($logoPath)
                <img src="{{ $logoPath }}" style="height: 30px; vertical-align: middle; margin-right: 5px;">
            @endif
            <h2>{{ $settings['school_name'] }}</h2>
            <p>{{ $settings['system_address'] }}</p>
        </div>

        @if($studentPhoto)
            <img src="{{ $studentPhoto }}" class="photo" alt="Student Photo">
        @else
            <div class="photo" style="display: flex; align-items: center; justify-content: center; color: #94a3b8; font-size: 10px;">No Photo</div>
        @endif

        <div class="name">{{ $student->first_name }} {{ $student->last_name }}</div>
        <div class="admission">Admission No: <strong>{{ $student->admission_no }}</strong></div>

        <div class="details">
            <div><strong>Class:</strong> {{ $student->classModel->name ?? 'N/A' }} - {{ $student->section->name ?? 'N/A' }}</div>
            <div><strong>DOB:</strong> {{ $student->dob ? $student->dob->format('d M Y') : 'N/A' }}</div>
            <div><strong>Blood:</strong> {{ $student->blood_group ?? 'N/A' }}</div>
            <div><strong>Parent:</strong> {{ $student->father_name ?? 'N/A' }}</div>
            <div><strong>Phone:</strong> {{ $student->contact_number ?? 'N/A' }}</div>
        </div>

        <div class="footer">
            If found, please return to the school address.<br>
            {{ $settings['system_phone'] }} | {{ $settings['website'] }}
        </div>
    </div>
</body>
</html>