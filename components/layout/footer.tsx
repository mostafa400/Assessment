"use client"

import type React from "react"
import { useState } from "react"
import { Twitter, Facebook } from "lucide-react"
import { useTranslations } from "next-intl"
import SubscriptionForm from "./SubscriptionForm"

export default function Footer() {
  const t = useTranslations()
  const year = new Date().getFullYear()

  return (
    <>
      <div style={{ height: "25px" }} className="bg-white"></div>

      <footer className="w-full" style={{ backgroundColor: "#643F2E" }}>
        <div className="container mx-auto px-4 py-8">
          {/* Top Section - Email Subscription and Social */}
          <div className="flex flex-col md:flex-row justify-end items-center md:items-start mb-8 gap-4 md:gap-6">
            {/* Combined Email, Contacts and Social icons */}
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
              <SubscriptionForm />

              <span className="text-white font-medium text-center md:text-left">{t('Footer.contacts')}</span>

              {/* Social icons */}
              <div className="flex gap-4 justify-center md:justify-start">
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white border-opacity-30 mb-8"></div>

          {/* Bottom Section - Links and Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Footer Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 lg:gap-8">
              <a href="/#" className="text-white hover:text-gray-300 transition-colors">
                {t('Navigation.about')}
              </a>
              <a href="/#" className="text-white hover:text-gray-300 transition-colors">
                {t('Footer.ourStrategy')}
              </a>
              <a href="/#" className="text-white hover:text-gray-300 transition-colors">
                {t('Footer.ourAdvantages')}
              </a>
              <a href="/#" className="text-white hover:text-gray-300 transition-colors">
                {t('Footer.socialResponsibility')}
              </a>
              <a href="/#" className="text-white hover:text-gray-300 transition-colors">
                {t('Navigation.services')}
              </a>
            </div>

            {/* Copyright */}
            <div className="text-white text-sm">
              {t('Footer.copyright', { year })}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
