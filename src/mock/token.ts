export enum UserType {
  SUPER_ADMIN = 'superAdmin',
  ADMIN = 'admin',
  USER = 'user',
}

export const Tokens = {
  [UserType.SUPER_ADMIN]:
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InV0aWxpdHkiLCJwYXNzd29yZCI6IjEyMzQ1NiIsInJvbGUiOiJzdXBlckFkbWluIn0.a7qCFYg1iYfsruWR56pVebOyMi8h-bfUbP-4wk_BIW5aH74JKOJ2KsX1QPCa1mbw7YHm2mG2uHaZJpfwyJsEmg',
  [UserType.ADMIN]:
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIxMjM0NTYiLCJyb2xlIjoiYWRtaW4ifQ.4Z4XlbIefUQZ7GEJPiQ16EOZbEvKpPNb93dEg16o1irbW2N3d9_wLiOdDClJgKXW7Gjnd-cG-p1EycqeuGTS-A',
  [UserType.USER]:
    'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJwYXNzd29yZCI6IjEyMzQ1NiIsInJvbGUiOiJ1c2VyIn0.T7gy06rLe5A0DB6icELOlEmmEr3c_TK9XAjujxPUtP09xMFMNIdUpe7J-j5gSbRMi8zLLjhGzAY_oZY3tdDyMg',
};

export function decodeToken(token: string) {
  return JSON.parse(decodeURIComponent(encodeURIComponent(window.atob(token.split('.')[1]))));
}
