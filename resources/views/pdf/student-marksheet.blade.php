<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Student Marksheet</title>
<style>
@page { size: A4 portrait; margin: 10mm; }
* { box-sizing: border-box; }
body { margin: 0; padding: 0; font-family: "DejaVu Sans", sans-serif; color: #333; background: #fff; }
.marksheet { width: 100%; padding: 5mm; }


.header { width: 100%; border-bottom: 3px double #29245a; padding-bottom: 5mm; margin-bottom: 5mm; }
.header-table { width: 100%; border-collapse: collapse; }
.header-table td { padding: 0; vertical-align: middle; }
.logo-cell { width: 25mm; text-align: center; }
.logo { width: 22mm; height: 22mm; object-fit: contain; }
.school-info { text-align: center; padding: 0 5mm; }
.school-name { font-family: "DejaVu Serif", serif; font-size: 22px; font-weight: bold; color: #bd2835; text-transform: uppercase; margin-bottom: 2mm; }
.school-address { font-size: 11px; color: #555; margin-bottom: 3mm; }
.session-badge { display: inline-block; background: #cf2431; color: white; padding: 2mm 8mm; border-radius: 5mm; font-size: 13px; font-weight: bold; }
.session-badge span { background: white; color: #a34477; padding: 1mm 5mm; border-radius: 4mm; margin-left: 2mm; }


.student-details { width: 100%; border-collapse: collapse; margin-bottom: 5mm; font-size: 11px; }
.student-details td { padding: 2mm 1mm; border: none; }
.student-details .label { font-weight: bold; color: #555; width: 35mm; }
.student-details .value { border-bottom: 1px dotted #999; min-width: 50mm; display: inline-block; padding: 0 2mm; font-weight: 600; color: #222; }


.marks-table { width: 100%; border-collapse: collapse; margin-bottom: 5mm; font-size: 10px; }
.marks-table th, .marks-table td { border: 1px solid #29245a; padding: 2mm; text-align: center; }
.marks-table th { background: #f8f9fa; font-weight: bold; color: #b52d3a; }
.marks-table .subject-col { text-align: left; padding-left: 3mm; width: 35%; }
.marks-table .subject-name { font-weight: 600; color: #222; }
.marks-table .subject-code { font-size: 9px; color: #666; }
.marks-table .total-row { background: #fff5f5; font-weight: bold; color: #a83a43; }
.marks-table .total-row td { padding: 3mm 2mm; }


.remarks-section { margin-top: 5mm; font-size: 11px; line-height: 2.5; }
.remark-line { border-bottom: 1px dotted #555; display: inline-block; min-width: 60mm; }
.signatures { margin-top: 15mm; font-size: 11px; }
.signatures-table { width: 100%; border-collapse: collapse; }
.signatures-table td { padding: 0; vertical-align: bottom; }
.signature-box { text-align: center; color: #a33d48; }
.signature-line { border-top: 1px solid #555; width: 50mm; margin: 0 auto 2mm; padding-top: 2mm; }

/* GRADING TABLE */
.instruction-section { margin-top: 8mm; page-break-inside: avoid; }
.instruction-title { text-align: center; margin-bottom: 3mm; }
.instruction-title span { background: #e76b29; color: white; padding: 2mm 8mm; font-size: 13px; font-weight: bold; border-radius: 2mm; }
.grading-text { font-size: 10px; margin-bottom: 2mm; color: #555; }
.grading-table { width: 100%; border-collapse: collapse; font-size: 10px; }
.grading-table th, .grading-table td { border: 1px solid #29245a; padding: 2mm; text-align: center; }
.grading-table th { background: #f8f9fa; color: #a33d48; }

@media print {
    body { background: none; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}
</style>
</head>
<body>

<div class="marksheet">
    <!-- HEADER -->
    <div class="header">
        <table class="header-table">
            <tr>
                <td class="logo-cell">
                    @if($logoPath && file_exists($logoPath))
                        <img src="{{ $logoPath }}" class="logo" alt="School Logo">
                    @else
                        <div style="width: 22mm; height: 22mm; border: 2px solid #ccc; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #999; font-size: 10px;">Logo</div>
                    @endif
                </td>
                <td class="school-info">
                    <div class="school-name">{{ $settings['school_name'] }}</div>
                    <div class="school-address">{{ $settings['system_address'] }}</div>
                    <div class="session-badge">
                        ACADEMIC SESSION: <span>{{ $academicSession ?? '20__ - 20__' }}</span>
                    </div>
                </td>
            </tr>
        </table>
    </div>


    <table class="student-details">
        <tr>
            <td><span class="label">Student's Name:</span> <span class="value">{{ $student->first_name }} {{ $student->last_name }}</span></td>
            <td><span class="label">Class:</span> <span class="value">{{ $student->classModel->name ?? 'N/A' }} - {{ $student->section->name ?? 'N/A' }}</span></td>
        </tr>
        <tr>
            <td><span class="label">Father's Name:</span> <span class="value">{{ $student->father_name ?? 'N/A' }}</span></td>
            <td><span class="label">Roll No.:</span> <span class="value">{{ $student->roll_no ?? 'N/A' }}</span></td>
        </tr>
        <tr>
            <td><span class="label">Mother's Name:</span> <span class="value">{{ $student->mother_name ?? 'N/A' }}</span></td>
            <td><span class="label">Date of Birth:</span> <span class="value">{{ $student->dob ? $student->dob->format('d-m-Y') : 'N/A' }}</span></td>
        </tr>
    </table>

  
    <table class="marks-table">
        <thead>
            <tr>
                <th rowspan="2" class="subject-col">Subject Name</th>
                <th rowspan="2">Full Marks</th>
                <th rowspan="2">Pass Marks</th>
                <th colspan="3">Marks Obtained</th>
                <th rowspan="2">% (100)</th>
                <th rowspan="2">Grade</th>
            </tr>
            <tr>
                <th>Theory</th>
                <th>Practical</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($marks as $mark)
                @php
                    $fullMarks = $mark->full_marks ?? 100;
                    $passMarks = $mark->pass_marks ?? 40;
                    $percentageSubject = $fullMarks > 0 ? ($mark->obtained_mark / $fullMarks) * 100 : 0;

                    $subjectGrade = 'F';
                    if ($mark->obtained_mark >= $passMarks) {
                        if ($percentageSubject >= 90) $subjectGrade = 'A+';
                        elseif ($percentageSubject >= 80) $subjectGrade = 'A';
                        elseif ($percentageSubject >= 70) $subjectGrade = 'B+';
                        elseif ($percentageSubject >= 60) $subjectGrade = 'B';
                        else $subjectGrade = 'C';
                    }
                @endphp
                <tr>
                    <td class="subject-col">
                        <div class="subject-name">{{ $mark->subject->name }}</div>
                        <div class="subject-code">({{ $mark->subject->code ?? 'N/A' }})</div>
                    </td>
                    <td>{{ $fullMarks }}</td>
                    <td>{{ $passMarks }}</td>
                    <td>{{ $mark->theory_mark ?? '-' }}</td>
                    <td>{{ $mark->practical_mark ?? '-' }}</td>
                    <td><strong>{{ $mark->obtained_mark }}</strong></td>
                    <td>{{ number_format($percentageSubject, 1) }}%</td>
                    <td><strong>{{ $subjectGrade }}</strong></td>
                </tr>
            @endforeach
            <tr class="total-row">
                <td colspan="3" style="text-align: right; padding-right: 3mm;">Over All Grand Total</td>
                <td>-</td>
                <td>-</td>
                <td>{{ $totalObtained }}</td>
                <td>{{ number_format($percentage, 1) }}%</td>
                <td>{{ $grade }}</td>
            </tr>
        </tbody>
    </table>

   
    <div class="remarks-section">
        <div>Class Teacher's Remarks: <span class="remark-line"></span></div>
        <div>Promoted to Class: <span class="remark-line" style="min-width: 30mm;"></span> Place: <span class="remark-line" style="min-width: 40mm;"></span></div>
        <div>Date: <span class="remark-line" style="min-width: 50mm;"></span></div>
    </div>

  
    <div class="signatures">
        <table class="signatures-table">
            <tr>
                <td style="width: 50%;">
                    <div class="signature-box">
                        <div class="signature-line"></div>
                        Signature of Class Teacher
                    </div>
                </td>
                <td style="width: 50%;">
                    <div class="signature-box">
                        <div class="signature-line"></div>
                        Signature of Principal
                    </div>
                </td>
            </tr>
        </table>
    </div>


    <div class="instruction-section">
        <div class="instruction-title"><span>INSTRUCTION</span></div>
        <div class="grading-text">Grading Scale for Scholastic Area: Grades are awarded on a 5 part grading Scales as follows.</div>
        <table class="grading-table">
            <tr>
                <th>Mark Range</th>
                <th>Grade</th>
                <th style="width: 5mm; border: none;"></th>
                <th>Mark Range</th>
                <th>Grade</th>
            </tr>
            <tr>
                <td>90 - 100</td>
                <td>A+</td>
                <td style="border: none;"></td>
                <td>Below 40</td>
                <td>F (Fail)</td>
            </tr>
            <tr>
                <td>80 - 89</td>
                <td>A</td>
                <td style="border: none;"></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>70 - 79</td>
                <td>B+</td>
                <td style="border: none;"></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>60 - 69</td>
                <td>B</td>
                <td style="border: none;"></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>40 - 59</td>
                <td>C</td>
                <td style="border: none;"></td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
</div>

</body>
</html>