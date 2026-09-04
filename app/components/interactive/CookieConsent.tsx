"use client";

import { useEffect, useMemo, useState } from "react";
import Script from "next/script";

type ConsentState = "accepted" | "declined" | null;

const STORAGE_KEY = "nhm_cookie_consent";

export function CookieConsent({ gaId: gaIdProp }: { gaId?: string } = {}) {
  const gaId = gaIdProp || process.env.NEXT_PUBLIC_GA_ID || process.env.GA_ID;
  const [consent, setConsent] = useState<ConsentState>(null);
  const [hydrated, setHydrated] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored);
      setShowBanner(false);
    } else {
      setConsent(null);
      setShowBanner(true);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    const onOpen = () => setShowBanner(true);
    window.addEventListener("nhm-open-cookie-preferences", onOpen);
    return () => window.removeEventListener("nhm-open-cookie-preferences", onOpen);
  }, []);

  const analyticsAllowed = hydrated && consent === "accepted" && Boolean(gaId);
  const canShowManageButton = hydrated && consent !== null;
  const shouldShowBanner = hydrated && showBanner;

  const bodyText = useMemo(
    () =>
      "We use Google Analytics cookies to understand how people use this site. You can accept or decline, and change your choice at any time.",
    []
  );

  const updateConsent = (next: Exclude<ConsentState, null>) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    setConsent(next);
    setShowBanner(false);
  };

  if (!gaId) return null;

  return (
    <>
      {analyticsAllowed ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
          </Script>
        </>
      ) : null}

      {shouldShowBanner ? (
        <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie preferences">
          <p className="cookie-banner__title">Cookie preferences</p>
          <p className="cookie-banner__body">{bodyText}</p>
          <div className="cookie-banner__actions">
            <button type="button" className="nhm-btn nhm-btn--secondary nhm-btn--sm" onClick={() => updateConsent("declined")}>Decline</button>
            <button type="button" className="nhm-btn nhm-btn--primary nhm-btn--sm" onClick={() => updateConsent("accepted")}>Accept analytics</button>
          </div>
        </div>
      ) : null}

      {canShowManageButton ? (
        <button
          type="button"
          className="cookie-manage"
          onClick={() => setShowBanner(true)}
          aria-label="Open cookie preferences"
        >
          Cookie preferences
        </button>
      ) : null}
    </>
  );
}
