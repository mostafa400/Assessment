"use client"

import type React from "react"

import { useState,useEffect } from "react"
import Link from "next/link"
import { useRouter as useNextRouter } from "next/navigation"
import { Search, Menu, X, ChevronDown, Globe, Calendar } from "lucide-react"
import { useTranslations } from 'next-intl';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState("EN")
  const nextRouter = useNextRouter()
  const [locale, setLocale] = useState('en')  



useEffect(() => {
  const locale = window.location.pathname.split('/')[1] || 'en'
  setCurrentLanguage(locale === 'ar' ? 'AR' : 'EN')
}, [])

// Modified toggle function
const toggleLanguage = () => {
  const newLocale = currentLanguage === 'EN' ? 'ar' : 'en'
  window.location.href = `/${newLocale}${window.location.pathname.replace(/^\/(en|ar)/, '')}`
}


  const t = useTranslations()

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#" , key: "about"},
    { name: "Practice", href: "/#" },
  ]

  const navigationLinksAfterServices = [
    { name: "Blog", href: "/#" , key: "blog"},
    { name: "Our Team", href: "/#" , key: "team"},
    { name: "Contact Us", href: "/#" ,key: "contact"},
  ]

  const servicesDropdown = [
    // Column 1
    [
      { name: "Legal Consultation Services", href: "/#", key: "legalConsultation" },
      { name: "Foreign Investment Services", href: "/#" , key: "foreignInvestment" },
      { name: "Contracts", href: "/#" , key: "contracts" },
      { name: "Notarization", href: "/#", key:"notarization"},
      { name: "Insurance", href: "/#" ,key: "insurance"},
    ],
    // Column 2
    [
      { name: "...and Defense in All Cases", href: "/#", key: "defenseCases" },
      { name: "Banks and Financial Institutions", href: "/#" , key: "banksFinancial" },
      { name: "Corporate Governance Services", href: "/#", key: "corporateGovernance" },
      { name: "Companies Liquidation", href: "/#", key: "companiesLiquidation" },
      { name: "Internal Regulations for Companies", href: "/#", key: "internalRegulations" },],
    // Column 3
    [
      { name: "Services for Companies and Institutions", href: "/#", key: "companiesInstitutions" },
      { name: "Arbitration", href: "/#", key: "arbitration" },
      { name: "Intellectual Property", href: "/#", key: "intellectualProperty" },
      { name: "Corporate Restructuring and Reorganization", href: "/#" , key: "corporateRestructuring" },
    ],
    // Column 4
    [
      { name: "Establishing National and Foreign Companies", href: "/#" ,  key: "establishingCompanies" },
      { name: "Commercial Agencies", href: "/#" , key: "commercialAgencies" },       
      { name: "Supporting Vision 2030", href: "/#" , key: "vision2030" },
      { name: "Estates", href: "/#" , key: "estates" },
    ],
  ]

const searchSuggestions = [
  { 
    keywords: [
      "home", "main", "index",
      "الرئيسية", "الصفحة الرئيسية", "البداية"
    ], 
    href: "/#", 
    name: t("Navigation.home") 
  },
  { 
    keywords: [
      "about", "company", "firm", "history",
      "من نحن", "عن", "شركة", "تاريخ"
    ],
    href: "/#", 
    name: t("Navigation.about") 
  },
  { 
    keywords: [
      "practice", "areas", "law",
      "ممارسة", "مجالات", "قانون"
    ],
    href: "/#", 
    name: t("Navigation.practice") 
  },
  { 
    keywords: [
      "blog", "news", "articles",
      "مدونة", "أخبار", "مقالات"
    ],
    href: "/#", 
    name: t("Navigation.blog") 
  },
  { 
    keywords: [
      "team", "lawyers", "attorneys", "staff",
      "فريق", "محامون", "محامين", "موظفين"
    ],
    href: "/#", 
    name: t("Navigation.team") 
  },
  { 
    keywords: [
      "contact", "reach", "phone", "email",
      "اتصال", "تواصل", "هاتف", "بريد"
    ],
    href: "/#", 
    name: t("Navigation.contact") 
  },
  { 
    keywords: [
      "legal", "consultation", "advice",
      "قانوني", "استشارة", "نصيحة"
    ],
    href: "/#", 
    name: t("Services.legalconsultation") 
  },
  { 
    keywords: [
      "foreign", "investment",
      "استثمار", "أجنبي"
    ],
    href: "/#", 
    name: t("Services.foreigninvestment") 
  },
  { 
    keywords: [
      "contracts", "agreements",
      "عقود", "اتفاقيات"
    ],
    href: "/#", 
    name: t("Services.contracts") 
  },
  { 
    keywords: [
      "notarization", "official",
      "توثيق", "رسمي"
    ],
    href: "/#", 
    name: t("Services.notarization") 
  }
];


  




  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setSearchQuery("")
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      const match = searchSuggestions.find((suggestion) =>
        suggestion.keywords.some((keyword) => keyword.includes(query) || query.includes(keyword)),
      )

      if (match) {
        nextRouter.push(match.href)
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    }
  }



  const getFilteredSuggestions = () => {
  if (!searchQuery.trim()) return [];
  
  // Normalize Arabic text and remove diacritics
  const normalizeArabic = (text: string) => 
    text.normalize('NFKD').replace(/[\u064B-\u065F]/g, '');
    
  const query = normalizeArabic(searchQuery.toLowerCase().trim());
  
  return searchSuggestions.filter(suggestion => 
    suggestion.keywords.some(keyword => 
      normalizeArabic(keyword.toLowerCase()).includes(query)
    )
  ).slice(0, 5);
}




  return (
    <header className="w-full sticky top-0 z-50 bg-transparent">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className={`flex-shrink-0 ${locale === 'ar' ? 'ml-4' : 'mr-4'}`}>

            <Link href="/" className={`flex items-center ${locale === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "#643F2E" }}
              >
                <span className="font-bold text-xl text-white ">L</span>
              </div>
              <span className="ml-2 text-xl font-bold hidden sm:block text-white">LawFirm</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={`hidden lg:flex items-center ${locale === 'ar' ? 'gap-x-8 flex-row-reverse' : 'gap-x-8'}`}>

            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium text-white hover:text-amber-200 transition-colors duration-200 ${
                  locale === 'ar' && link.name === 'Home' ? 'mr-6' : ''
                  }`}

              >
                
              {t(`Navigation.${link.key || link.name.toLowerCase().replace(' ', '')}`)}
                 
              </Link>
            ))}

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center font-medium text-white hover:text-amber-200 transition-colors duration-200"
              >
                {t('Navigation.services')}
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>

              {isServicesOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsServicesOpen(false)} />
                  <div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[90vw] max-w-6xl rounded-lg shadow-xl z-50 overflow-hidden"
                    style={{ backgroundColor: "#643F2E" }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                      {servicesDropdown.map((column, columnIndex) => (
                        <div key={columnIndex} className="space-y-3">
                          {column.map((service) => (
                            <Link
                              key={service.name}
                              href={service.href}
                              className="block text-white hover:text-amber-200 transition-colors duration-200 text-sm leading-relaxed py-1"
                              onClick={() => setIsServicesOpen(false)}
                            >
                              {/* {service.name} */}
                              {t(`Services.${service.key.toLowerCase()}`)}

                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {navigationLinksAfterServices.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="font-medium text-white hover:text-amber-200 transition-colors duration-200"
              >
               {t(`Navigation.${link.key || link.name.toLowerCase().replace(' ', '')}`)}

              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className={`flex items-center ${locale === 'ar' ? 'space-x-reverse space-x-4' : 'space-x-4'}`}>

            <div className="relative">
              <button
                onClick={handleSearchClick}
                className="p-2 text-white hover:text-amber-200 transition-colors duration-200"
              >
                <Search className="h-5 w-5" />
              </button>

              {isSearchOpen && (
                <div className={`absolute top-full ${locale === 'ar' ? 'left-0' : 'right-0'} mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50`}>
                  <form onSubmit={handleSearchSubmit} className="p-4">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('Header.searchPlaceholder')}
                       className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#643F2E] focus:border-transparent ${locale === 'ar' ? 'text-left' : 'text-left'}`}
                       dir="auto"
                       lang={locale}
                      autoFocus
                    />
                  </form>

                  {getFilteredSuggestions().length > 0 && (
                    <div className={`border-t border-gray-200 ${locale === 'ar' ? 'text-right' : 'text-right'}`}>
                      {getFilteredSuggestions().map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            nextRouter.push(suggestion.href)
                            setIsSearchOpen(false)
                            setSearchQuery("")
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
                        >
                          <span className="text-gray-900">{suggestion.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <Link
              href="/#"
              className={`hidden sm:flex items-center ${locale === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'} px-4 py-2 rounded-md text-white transition-colors duration-200 hover:opacity-90`}

              style={{ backgroundColor: "#643F2E" }}
            >
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{t('Header.bookMeeting')}</span>
            </Link>
<button
  onClick={toggleLanguage}
  className={`flex items-center ${locale === 'ar' ? 'space-x-reverse space-x-1' : 'space-x-1'} px-3 py-1 border border-white text-white rounded-md transition-colors duration-200 hover:bg-white hover:text-gray-900 min-w-[60px]`}
>
  <Globe className="h-4 w-4" />
  <span className="text-sm font-medium text-center w-full">
    {currentLanguage === 'AR' ? 'EN' : 'AR'}
  </span>
</button>


            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-amber-200 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
<div
  className="lg:hidden fixed top-16 left-0 right-0 bottom-0 z-50 overflow-y-auto"
>
  <div 
    className="container mx-auto px-4 py-4"
    style={{ backgroundColor: "#643F2E" }}
  >
                <div className="space-y-2">
                  {[...navigationLinks, ...navigationLinksAfterServices].map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-2 text-white hover:text-amber-200 hover:bg-opacity-20 hover:bg-white rounded-md transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                     {t(`Navigation.${link.key || link.name.toLowerCase().replace(' ', '')}`)}
                    </Link>
                  ))}

                  {/* Mobile Services */}
                  <div className="px-4 py-2">
                    <button
                      onClick={() => setIsServicesOpen(!isServicesOpen)}
                      className="flex items-center justify-between w-full text-white hover:text-amber-200 font-medium"
                    >
                     {t('Navigation.services')}
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {isServicesOpen && (
                      <div className="absolute left-0 right-0 mt-2 shadow-lg z-60" style={{ backgroundColor: "#643F2E" }}>
                        <div className="container mx-auto px-4 py-4">
                          <div className="grid grid-cols-1 gap-1">
                            {servicesDropdown.flat().map((service) => (
                              <Link
                                key={service.name}
                                href={service.href}
                                className="block py-2 px-2 text-sm text-white hover:text-amber-200 hover:bg-opacity-20 hover:bg-white rounded transition-colors duration-200"
                                onClick={() => {
                                  setIsMenuOpen(false)
                                  setIsServicesOpen(false)
                                }}
                              >
                               {t(`Services.${service.key.toLowerCase()}`)}

                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Link
                    href="/book-meeting"
                    className="flex items-center space-x-2 mx-4 px-4 py-2 bg-white rounded-md hover:bg-gray-100 transition-colors duration-200"
                    style={{ color: "#643F2E" }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">
                      {t('Header.bookMeeting')}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
