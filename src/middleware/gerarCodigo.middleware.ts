interface OtpEntrada {
  code: string; 
  expires: number;  
}

export const otpStore: Map<string, OtpEntrada> = new Map();