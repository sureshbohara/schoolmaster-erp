<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>403 - Access Denied</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 dark:bg-slate-900 flex items-center justify-center min-h-screen">
    <div class="text-center p-8 max-w-lg">
        <!-- Icon -->
        <div class="bg-red-100 dark:bg-red-900/30 p-6 rounded-full mb-6 inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
        </div>

        <!-- Text -->
        <h1 class="text-6xl font-extrabold text-gray-900 dark:text-white mb-2">403</h1>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Access Denied</h2>
        <p class="text-gray-600 dark:text-gray-400 mb-8 text-lg">
            Sorry, you do not have the necessary permissions to view this page or perform this action.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            

            <a href="{{ route('dashboard') }}" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go to Dashboard
            </a>
            
       
            @php
                $previousUrl = url()->previous();
                $currentUrl = url()->current();
                $backUrl = ($previousUrl !== $currentUrl) ? $previousUrl : route('dashboard');
            @endphp
            
            <a href="{{ $backUrl }}" class="px-6 py-3 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg transition flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Go Back
            </a>
            
        </div>
    </div>
</body>
</html>