import createMiddleware from 'next-intl/middleware';
import {routing} from './navigation';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(bn|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};
