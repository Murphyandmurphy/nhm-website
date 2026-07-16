import type { Metadata } from "next";
import { Container } from "@/app/components/layout/Container";

export const metadata: Metadata = {
  title: "Terms of Use — Nadia Henrique-Murray",
};

export default function TermsOfBusinessPage() {
  return (
    <section className="section section--paper">
      <Container narrow>
        <article className="prose">
          <h1 className="postbody__h2">Terms of Use</h1>
          <p>
            <em>Last updated: 14 July 2026</em>
          </p>

          <h2 className="postbody__h3">1. About us</h2>
          <p>
            This website (nadiahm.co.uk) is operated by Nadia Henrique-Murray, trading as Nadia Henrique-Murray - Brand
            Growth Strategist ("we", "us", "our"), a sole trader operating from a home office in Cornwall, England.
          </p>
          <p>
            <strong>Trading name:</strong> Nadia Henrique-Murray - Brand Growth Strategist
          </p>
          <p>
            <strong>Contact:</strong> hello@nadiahm.co.uk
          </p>

          <h2 className="postbody__h3">2. Use of the site</h2>
          <p>
            This site is provided for general information about our services, and to allow you to get in touch with us via
            our contact form. We don't sell any products or services directly through the site, and we don't process any
            payments through it; any work we agree to carry out is arranged and paid for separately (by bank transfer), under
            its own agreed terms.
          </p>
          <p>
            You may not use the site for any unlawful purpose, or in any way that could damage, disable, overburden, or
            impair it, or interfere with anyone else's use of it. You must not attempt to gain unauthorised access to the
            site or any systems connected to it.
          </p>
          <p>
            The site does not support user-generated content or public posting. Any information you submit via our contact
            form is treated in accordance with our Privacy &amp; Cookie Policy, not published on the site.
          </p>

          <h2 className="postbody__h3">3. Intellectual property</h2>
          <p>
            All content on this site, including text, graphics, logos, and images, belongs to us or our licensors and is
            protected by copyright and other intellectual property laws.
          </p>
          <p>
            You may view and print pages from the site for your own personal or internal business reference only. You must not
            reproduce, copy, distribute, or otherwise exploit any content from the site without our prior written consent.
          </p>

          <h2 className="postbody__h3">4. Accuracy and availability</h2>
          <p>
            We take reasonable care to keep the site accurate and up to date, but we don't guarantee that it will always be
            available, uninterrupted, or error-free, and content may be changed or removed at any time without notice.
          </p>
          <p>
            Content on the site is provided for general information only and doesn't constitute professional advice specific to
            your circumstances.
          </p>

          <h2 className="postbody__h3">5. Third-party links</h2>
          <p>
            The site may contain links to third-party websites, provided for your convenience only. We don't control, and
            aren't responsible for, the content or privacy practices of any third-party site.
          </p>

          <h2 className="postbody__h3">6. Privacy and cookies</h2>
          <p>
            Your use of the site is also governed by our Privacy &amp; Cookie Policy, which explains how we collect, use, and
            protect your personal data in line with UK GDPR and the Data Protection Act 2018.
          </p>

          <h2 className="postbody__h3">7. Liability</h2>
          <p>Nothing in these terms excludes or limits any liability that cannot be excluded or limited under English law.</p>
          <p>
            To the fullest extent permitted by law, we won't be liable for any loss or damage, direct, indirect, or
            consequential, arising from your use of, or inability to use, the site, including loss of data, profits, or
            business.
          </p>

          <h2 className="postbody__h3">8. Changes to these terms</h2>
          <p>
            We may update these terms from time to time. Changes will take effect once posted on this page, and your continued
            use of the site after that point means you accept the updated terms.
          </p>

          <h2 className="postbody__h3">9. Governing law</h2>
          <p>
            These terms are governed by the laws of England and Wales, and any disputes will be subject to the exclusive
            jurisdiction of the courts of England and Wales.
          </p>

          <h2 className="postbody__h3">10. Contact</h2>
          <p>
            If you have any questions about these terms, please contact us at <strong>hello@nadiahm.co.uk</strong>.
          </p>
        </article>
      </Container>
    </section>
  );
}