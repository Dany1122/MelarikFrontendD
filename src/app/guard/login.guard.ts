import type { CanMatchFn } from '@angular/router';

export const loginGuard: CanMatchFn = (route, segments) => {
  const isLoginRoute = segments.some(segment => segment.path === 'login');
  if (isLoginRoute) {
    localStorage.removeItem('token');
  }
  return true;
};