import React, { createContext, useContext, useState, ReactNode } from 'react';

type SignUpContextType = {
  businessName: string;
  setBusinessName: (name: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  logoUri: string | null;        
  setLogoUri: (uri: string) => void; 
};

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export const SignUpProvider = ({ children }: { children: ReactNode }) => {
  const [businessName, setBusinessName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logoUri, setLogoUri] = useState<string | null>(null);

  return (
    <SignUpContext.Provider
  value={{
    businessName,
    setBusinessName,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    logoUri,      // 👈 add
    setLogoUri,   // 👈 add
  }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUp = (): SignUpContextType => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error('useSignUp must be used within a SignUpProvider');
  }
  return context;
};
