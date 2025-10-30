/**
 * International SEO with hreflang
 * Supports 20+ languages for global reach
 */

interface HreflangProps {
  currentUrl: string
  languages?: string[]
}

const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', region: 'US' },
  { code: 'es', name: 'Spanish', region: 'ES' },
  { code: 'fr', name: 'French', region: 'FR' },
  { code: 'de', name: 'German', region: 'DE' },
  { code: 'it', name: 'Italian', region: 'IT' },
  { code: 'pt', name: 'Portuguese', region: 'BR' },
  { code: 'ru', name: 'Russian', region: 'RU' },
  { code: 'ja', name: 'Japanese', region: 'JP' },
  { code: 'ko', name: 'Korean', region: 'KR' },
  { code: 'zh', name: 'Chinese (Simplified)', region: 'CN' },
  { code: 'zh', name: 'Chinese (Traditional)', region: 'TW' },
  { code: 'ar', name: 'Arabic', region: 'SA' },
  { code: 'hi', name: 'Hindi', region: 'IN' },
  { code: 'nl', name: 'Dutch', region: 'NL' },
  { code: 'sv', name: 'Swedish', region: 'SE' },
  { code: 'no', name: 'Norwegian', region: 'NO' },
  { code: 'da', name: 'Danish', region: 'DK' },
  { code: 'fi', name: 'Finnish', region: 'FI' },
  { code: 'pl', name: 'Polish', region: 'PL' },
  { code: 'tr', name: 'Turkish', region: 'TR' },
  { code: 'th', name: 'Thai', region: 'TH' },
  { code: 'vi', name: 'Vietnamese', region: 'VN' },
  { code: 'id', name: 'Indonesian', region: 'ID' },
  { code: 'ms', name: 'Malay', region: 'MY' },
]

/**
 * Generate hreflang tags for international SEO
 */
export function HreflangTags({ currentUrl }: HreflangProps) {
  // Remove protocol and domain for path
  const path = currentUrl.replace('https://1abel.com', '')

  return (
    <>
      {/* Default fallback for unmatched languages */}
      <link rel="alternate" hrefLang="x-default" href={`https://1abel.com${path}`} />

      {/* All supported languages */}
      {SUPPORTED_LANGUAGES.map((lang) => {
        const hreflangCode = lang.region ? `${lang.code}-${lang.region}` : lang.code
        const urlWithLang = lang.code === 'en'
          ? `https://1abel.com${path}`
          : `https://1abel.com/${lang.code}${path}`

        return (
          <link
            key={hreflangCode}
            rel="alternate"
            hrefLang={hreflangCode}
            href={urlWithLang}
          />
        )
      })}
    </>
  )
}

/**
 * Language selector component
 */
export function LanguageSelector() {
  const currentLang = 'en' // Default, could be from context/cookies

  return (
    <div className="language-selector">
      <select
        className="border rounded px-3 py-2"
        defaultValue={currentLang}
        onChange={(e) => {
          const lang = e.target.value
          if (lang !== 'en') {
            window.location.href = `/${lang}${window.location.pathname}`
          } else {
            window.location.href = window.location.pathname
          }
        }}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={`${lang.code}-${lang.region}`} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}

/**
 * Geographic targeting meta tags
 */
export function GeographicTargeting({ country, region }: { country?: string; region?: string }) {
  return (
    <>
      {country && <meta name="geo.country" content={country} />}
      {region && <meta name="geo.region" content={region} />}
      <meta name="geo.placename" content="Global" />
    </>
  )
}

/**
 * Currency and pricing localization meta
 */
export function CurrencyMeta({ currency, locale }: { currency: string; locale: string }) {
  return (
    <>
      <meta name="price-currency" content={currency} />
      <meta name="price-locale" content={locale} />
    </>
  )
}

/**
 * Generate international sitemap entries
 */
export function generateInternationalSitemapUrls(basePath: string) {
  const urls: Array<{ loc: string; hreflang: string }> = []

  SUPPORTED_LANGUAGES.forEach((lang) => {
    const hreflangCode = lang.region ? `${lang.code}-${lang.region}` : lang.code
    const url = lang.code === 'en'
      ? `https://1abel.com${basePath}`
      : `https://1abel.com/${lang.code}${basePath}`

    urls.push({
      loc: url,
      hreflang: hreflangCode,
    })
  })

  return urls
}
