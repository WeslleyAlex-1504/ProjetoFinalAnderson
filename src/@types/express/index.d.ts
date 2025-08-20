export {};
declare global {
  namespace Express {
    export interface Request {
      usuario: {
        id: number;
        nome: string;
        admin: boolean;
        ativo: boolean
      };
      
      
    }
  }
}