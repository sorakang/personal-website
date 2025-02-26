'use client';
import React, { createContext, useContext, useState } from 'react';

const TitleContext = createContext();

export function TitleProvider({ children }) {
  const [title, setTitle] = useState();

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
}

export function useTitle() {
  return useContext(TitleContext);
}
