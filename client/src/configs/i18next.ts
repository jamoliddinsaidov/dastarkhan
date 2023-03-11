import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

i18next.use(initReactI18next).use(LanguageDetector).use(Backend).init({
  fallbackLng: 'en',
})

export type LongLanguagesType = "O'zbek" | 'English' | 'Русский'
export type ShortLanguagesType = 'uz' | 'en' | 'ru'

export const languagesShort = {
  "O'zbek": 'uz',
  English: 'en',
  Русский: 'ru',
}

export const languagesLong = {
  uz: "O'zbek",
  en: 'English',
  ru: 'Русский',
}

export const availableLanguages = ['English', "O'zbek", 'Русский']
