import { type ClassValue, clsx } from "clsx"
import i18next from "i18next"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatString(input: string): string {
  // Reemplaza los guiones con espacios
  const replacedString = input.replace(/-/g, " ")

  // Convierte la primera letra a mayúscula y concatena con el resto de la cadena
  return replacedString.charAt(0).toUpperCase() + replacedString.slice(1)
}

export function changeLanguage(language: string) {
  i18next.changeLanguage(language)
}
