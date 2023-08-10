export interface JWTObject {
  role: string;
  id:number;
  sub: string;
  exp: number;
  iat: number;
}
