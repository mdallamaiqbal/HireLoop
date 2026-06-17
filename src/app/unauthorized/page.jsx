import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <div className="max-w-md w-full text-center space-y-6 p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        
        {/* Gravity Icon Wrapper */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
          {/* Using raw SVG for Gravity-style Lock/Shield Alert */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="h-9 w-9"
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <line x1="12" x2="12" y1="15" y2="17" />
          </svg>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
            401 - Unauthorized
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Oops! You don't have permission to access this page. Please log in with an authorized account or head back to safety.
          </p>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/auth/signin"
            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-[#8E51FF] hover:bg-[#8344f7] dark:bg-[#8E51FF] dark:hover:bg-[#8344f7] rounded-lg transition-colors shadow-sm focus:outline-none"
          >
           Sign In
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors focus:outline-none"
          >
            {/* Gravity-style Home SVG */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-2 h-4 w-4"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}