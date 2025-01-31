import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Student Management System',
  description: 'A system to manage student records'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <main className='min-h-screen bg-gray-50'>
          {/* Navigation Bar */}
          <nav className='bg-white shadow-sm'>
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='flex justify-between h-16'>
                <div className='flex'>
                  <div className='flex-shrink-0 flex items-center'>
                    <h1 className='text-xl font-bold text-gray-900'>
                      Student Management
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          {children}

          {/* Footer */}
          <footer className='bg-white border-t border-gray-200 mt-auto'>
            <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
              <div className='py-4'>
                <p className='text-center text-sm text-gray-500'>
                  © {new Date().getFullYear()} Student Management System
                </p>
              </div>
            </div>
          </footer>
        </main>
      </body>
    </html>
  );
}
