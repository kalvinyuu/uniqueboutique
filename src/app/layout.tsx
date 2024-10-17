import './globals.css';
import { Navbar } from '@/app/components/navbar';
import CartProvider from './components/providers';
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: 'Unique Boutique - Custom Pajamas',
  description: 'Create your dream pajamas at Unique Boutique!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-hidden bg-pink-100 font-sans dark:bg-purple-100 dark:text-gray-900 p-8 mx-auto max-w-7xl space-y-8">
        <ClerkProvider>
          <CartProvider>
            <Navbar />
            <main className="">
              {children}
            </main>
            <footer className="bg-pink-100 py-6 text-center border-t-2 border-white dark:bg-purple-200">
              <p className="text-pink-600 dark:text-gray-900">Made with love at Unique Boutique</p>
              <p>
                <a href="#" className="text-pink-600 font-bold hover:underline dark:text-gray-900">Contact Us</a> |{' '}
                <a href="#" className="text-pink-600 font-bold hover:underline dark:text-gray-900">Our Story</a>
              </p>
            </footer>
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
