import type { Metadata } from "next";
import { Container } from "@/app/components/layout/Container";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy — Nadia Henrique-Murray",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section section--paper">
      <Container narrow>
        <article className="prose">
          <h1 className="postbody__h2">Privacy &amp; Cookie Policy</h1>
          <p>
            <em>Last updated: 14 July 2026</em>
          </p>

          <h2 className="postbody__h3">1. Who we are</h2>
          <p>
            This website (nadiahm.co.uk) is operated by Nadia Henrique-Murray, trading as Nadia Henrique-Murray - Brand
            Growth Strategist ("we", "us", "our"), a sole trader operating from a home office in Cornwall, England. We are
            the data controller for the personal data described in this policy.
          </p>
          <p>
            <strong>Trading name:</strong> Nadia Henrique-Murray - Brand Growth Strategist
          </p>
          <p>
            <strong>Contact:</strong> hello@nadiahm.co.uk
          </p>

          <h2 className="postbody__h3">2. What data we collect</h2>
          <p>We collect the following personal data, depending on how you interact with us:</p>
          <p>
            <strong>Enquiries via our contact form:</strong> name, company name, email address, phone number (optional), and
            any details you share about yourself and the support you're looking for.
          </p>
          <p>
            <strong>Email or social media contact:</strong> your name, contact details, and the content of any messages you
            send us via email, Instagram, or LinkedIn.
          </p>
          <p>
            <strong>Website usage data:</strong> collected via Google Analytics; see our Cookie Policy in Section 7.
          </p>
          <p>
            <strong>Client project data:</strong> if we work together, we collect information you provide via an online
            questionnaire (Google Form) or emailed documents, which may include financial data and confidential information
            about your business, operations, and competitors. This is provided directly by you and is necessary for us to
            deliver our services.
          </p>
          <p>
            We do not knowingly collect any special category data (e.g. health, ethnicity, religion) and ask that you do not
            include this in any communication with us unless essential and relevant to our work together.
          </p>

          <h2 className="postbody__h3">3. How and why we use your data</h2>
          <p>We use your data for the following purposes, and on the following lawful bases under UK GDPR:</p>
          <ul>
            <li>To respond to your enquiry and correspond with you: legitimate interests (responding to people who contact us).</li>
            <li>
              To deliver our services once you become a client, including analysing the business information you provide:
              performance of a contract.
            </li>
            <li>To keep records for accounting, tax, and legal purposes: legal obligation.</li>
            <li>To understand how our website is used and improve it: consent (via cookies; see Section 7).</li>
          </ul>
          <p>We do not use your data for automated decision-making or profiling.</p>

          <h2 className="postbody__h3">4. Sharing your data</h2>
          <p>
            We do not sell or rent your personal data, and we do not share client business data with third parties unless you
            have expressly authorised this in writing.
          </p>
          <p>
            We do use a small number of service providers to help us run our business, who process data on our behalf:
          </p>
          <ul>
            <li>
              Google (Google Analytics: website usage data; Google Drive: secure storage of enquiry and client data; Google
              Forms: client questionnaires).
            </li>
            <li>
              Microsoft (Outlook: where enquiries submitted via our contact form, and other correspondence, are received and
              stored as email).
            </li>
          </ul>
          <p>
            Currently, Google and Microsoft are the only third-party service providers we use in this way. If this changes, we
            will update this section, along with the "last updated" date at the top of this policy, so it stays accurate.
          </p>
          <p>
            These providers are bound by their own data protection terms and, where required, appropriate safeguards for
            international transfers (see Section 5). We may also disclose data where required by law, or to professional
            advisers (e.g. an accountant) under confidentiality.
          </p>

          <h2 className="postbody__h3">5. International data transfers</h2>
          <p>
            Google and Microsoft both run infrastructure located in the UK, EU, and other countries, including the US. Where
            your data is transferred outside the UK, this is done under those providers&apos; Standard Contractual Clauses and the
            UK&apos;s International Data Transfer Addendum, which are recognised safeguards under UK GDPR.
          </p>

          <h2 className="postbody__h3">6. How long we keep your data</h2>
          <p>
            <strong>Enquiries that don&apos;t lead to client work:</strong> kept for up to 24 months from your last contact with us,
            then deleted.
          </p>
          <p>
            <strong>Client project data:</strong> kept for 6 years from the end of our engagement, in line with standard UK
            record-keeping and legal limitation periods, then securely deleted.
          </p>
          <p>Where we&apos;re required to keep information for longer for legal or accounting reasons, we will do so.</p>

          <h2 id="cookies" className="postbody__h3">7. Cookies</h2>
          <h3 className="postbody__h4">7.1 What cookies we use</h3>
          <p>
            Our website uses Google Analytics to understand how visitors use our site (e.g. pages visited, time on site,
            approximate location, device/browser type). This helps us improve the site and our content.
          </p>
          <p>Google Analytics places the following cookies:</p>
          <ul>
            <li>_ga: distinguishes users (expires after 2 years)</li>
            <li>_gid: distinguishes users (expires after 24 hours)</li>
          </ul>
          <p>We do not use any advertising, marketing, or social media cookies at this time.</p>

          <h3 className="postbody__h4">7.2 Your consent</h3>
          <p>
            Analytics cookies are not essential to the site working, so we only set them with your consent. When you first
            visit our site, you&apos;ll see a cookie banner where you can accept or decline analytics cookies. You can change your
            choice at any time using the cookie preferences link available on our site (typically found in the footer or via a
            small icon that re-opens the banner).
          </p>
          <p>
            You can also manage or delete cookies at any time through your browser settings. Disabling cookies won&apos;t stop the
            site working, but we won&apos;t be able to see anonymised usage data that helps us improve it.
          </p>
          <p>Instructions for common browsers:</p>
          <p>
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer">
              Google Chrome
            </a>{" "}
            -{" "}
            <a
              href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
              target="_blank"
              rel="noreferrer"
            >
              Mozilla Firefox
            </a>{" "}
            -{" "}
            <a href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer">
              Apple Safari
            </a>{" "}
            -{" "}
            <a href="https://support.apple.com/en-gb/HT201265" target="_blank" rel="noreferrer">
              iOS Safari
            </a>
          </p>

          <h2 className="postbody__h3">8. Keeping your information accurate</h2>
          <p>
            It&apos;s important the information we hold about you is accurate. Please let us know if any of your details change by
            emailing hello@nadiahm.co.uk.
          </p>

          <h2 className="postbody__h3">9. Your rights</h2>
          <p>Under UK GDPR, you have the right to:</p>
          <ul>
            <li>Access the personal data we hold about you.</li>
            <li>Correct inaccurate or incomplete data.</li>
            <li>Request deletion of your data, where we have no continuing reason to keep it.</li>
            <li>Object to our processing based on legitimate interests.</li>
            <li>Restrict how we use your data in certain circumstances.</li>
            <li>Receive your data in a portable format, or ask us to transfer it.</li>
            <li>Withdraw consent at any time, where processing is based on consent (e.g. analytics cookies).</li>
          </ul>
          <p>
            To exercise any of these rights, email hello@nadiahm.co.uk. We may ask you to verify your identity before
            responding, and we&apos;ll reply within one month.
          </p>
          <p>
            If you&apos;re unhappy with how we&apos;ve handled your data, you have the right to complain to the{" "}
            <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noreferrer">
              Information Commissioner&apos;s Office (ICO)
            </a>
            , the UK&apos;s data protection regulator, though we&apos;d appreciate the chance to resolve any concerns directly first.
          </p>

          <h2 className="postbody__h3">10. Security</h2>
          <p>We take reasonable steps to protect your personal data, including:</p>
          <ul>
            <li>
              Our website uses HTTPS encryption, so data submitted through our contact form is encrypted in transit.
            </li>
            <li>
              Contact form submissions are sent directly to our email and stored in Outlook, and other business data is stored
              in Google Drive, with access restricted to us and protected by password.
            </li>
          </ul>
          <p>
            No method of transmission or storage is 100% secure, but we keep these measures under review as our business
            grows.
          </p>

          <h2 className="postbody__h3">11. Changes to this policy</h2>
          <p>
            We may update this policy from time to time to reflect changes in our practices or the law. Any changes will be
            posted on this page with an updated "last updated" date.
          </p>

          <h2 className="postbody__h3">12. Contact us</h2>
          <p>
            If you have any questions about this policy or how we handle your data, please contact us at{" "}
            <strong>hello@nadiahm.co.uk</strong>.
          </p>
        </article>
      </Container>
    </section>
  );
}