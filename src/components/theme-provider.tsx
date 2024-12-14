"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <NextUIProvider>{children}
      </NextUIProvider>
    </NextThemesProvider>
  );
}
