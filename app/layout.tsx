import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import './global.css';
//import { GroupProvider } from './GroupContext';
//import { UserProvider } from '@auth0/nextjs-auth0/client';
import { GroupProvider } from './GroupContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {' '}
        <GroupProvider>{children}</GroupProvider>
      </body>
    </html>
  );
}
