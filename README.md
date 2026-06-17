# Nadia Henrique-Murray — Website

Marketing site for Nadia Henrique-Murray, fully editable via **Sanity CMS**.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion ·
`next/font` (Larken + Hanken Grotesk) · lucide-react · **Sanity** (embedded Studio).

> ⚠️ **Do the Sanity setup (step 1) before running the site.** Because all
> content comes from Sanity, the app needs your project's environment variables
> to start. Running `npm run dev` without them shows a "Missing environment
> variable" error — that's expected; just complete step 1 first.

---

## 1. Connect Sanity (one time, ~10 minutes)

### a. Install dependencies
```bash
npm install
```

### b. Create a free Sanity project
1. Go to **https://www.sanity.io/manage** and sign in (free account).
2. Click **Create project** → name it (e.g. "Nadia Henrique-Murray"). Use dataset **`production`** (public is fine).
3. Copy the **Project ID** shown on the project page.

### c. Add your environment variables
1. In the project folder, copy `.env.local.example` to **`.env.local`**.
2. Paste your Project ID:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID="paste-your-id-here"
   NEXT_PUBLIC_SANITY_DATASET="production"
   NEXT_PUBLIC_SANITY_API_VERSION="2024-10-01"
   ```

### d. Allow your computer to write to the project
```bash
npx sanity login          # opens a browser to sign in
```

### e. Load all the current content into Sanity
This imports everything you see on the site (all copy, services, testimonials)
so the dashboard opens already filled in:
```bash
npm run seed
```
(That runs `sanity dataset import seed.ndjson production --replace`.)

---

## 2. Run the site

```bash
npm run dev
```

- Public site → **http://localhost:3000**
- Editing dashboard → **http://localhost:3000/studio**

Sign in to the Studio and you'll see every page and section ready to edit.

---

## 3. Editing content

Everything is editable in the Studio at `/studio`:

| In the Studio | Controls |
|---|---|
| **Pages** | The **page builder** — create new pages by stacking section blocks (see §3a) |
| **Home / Services / About / Insights / Contact Page** | All headings, paragraphs, images, buttons for that fixed page |
| **Services** | The three services (icon, copy, checklist) |
| **Testimonials** | The rotating client quotes |
| **Insights Posts** | Your blog — create a post, it gets its own page at `/insights/your-title` |
| **Site Settings** | Email, phone, LinkedIn, footer tagline, **and the header menu + footer links** (see §3b) |

### 3a. The page builder (creating new pages)

1. In the Studio, click **Pages** → **Create new**.
2. Give it a **Page title** and a **URL** (e.g. title "Our Process" → it auto-fills the URL `our-process`, so the page lives at `yoursite.com/our-process`).
3. Under **Sections**, click **Add item** and choose a section template:

   | Block | What it is |
   |---|---|
   | **Hero** | Big intro band — title, two paragraphs, two buttons, image |
   | **Image & Text** | Two columns; image on the left or right (your choice), prose the other side |
   | **Service Cards (3-up)** | Three cards with icon, title, body and a link |
   | **Feature Grid** | Icon + heading + body items, in 2 or 3 columns |
   | **Testimonials** | Rotating client-quote carousel |
   | **Stats Row** | Big editorial numbers |
   | **Logo Strip** | Brand / client logo chips |
   | **Call to Action** | Highlighted blue or dark band with a button |
   | **Text Block** | A heading + paragraphs |
   | **Info Cards (3-up)** | Three icon cards (like the Insights strands) |
   | **Contact + Form** | Contact details + the enquiry form |

4. Fill in the block's fields. Each block has a **Background** option (cream / white / blue / dark) so you can alternate the bands.
5. **Drag** sections to reorder, or use the **⋮ menu** on each to duplicate or delete.
6. Click **Publish**. Your new page is live — and styled in the brand automatically.

> A demo page called **"Our Process"** (`/our-process`) is included so you can
> see the builder in action. Edit it freely or delete it.

### 3b. The navigation menu & footer

Open **Site Settings** → the **Navigation** and **Footer** tabs:

- **Header menu** — add, rename, reorder (drag) or remove the links across the top.
- For each link, either pick one of your **Pages** from the dropdown, **or** type
  a custom link (e.g. `/services`, `/about`, or a full `https://…` address).
- **Footer "Explore" links** work the same way.
- You can also set the **Header button** label/link, and the footer tagline.

So to publish a brand-new page end to end: build it in **Pages** → add it to the
menu in **Site Settings → Navigation** → Publish both.

### 3c. Formatting shortcuts
- `*word*` → *blue italic* (the brand accent)
- `**word**` → **bold**
- Leave a **blank line** between paragraphs to create separate paragraphs.

**Images:** drag a photo into any image field to replace a placeholder. Until
you do, the styled placeholder shows so the layout never looks broken.

Saved edits appear on the public site within ~60 seconds (or immediately after
a redeploy).

---

## 4. Project structure

```
app/
  layout.tsx                  # Root — fonts only
  globals.css                 # Design tokens + base + component/layout CSS
  types.ts
  (site)/                     # The public marketing site (shares Header/Footer)
    layout.tsx                # Fetches Site Settings (nav/footer), wraps pages
    page.tsx                  # Home  (/)
    services/page.tsx
    about/page.tsx
    insights/page.tsx         # Blog index
    insights/[slug]/page.tsx  # Blog post
    contact/page.tsx
    [slug]/page.tsx           # Builder pages  (/our-process, etc.)
  studio/[[...tool]]/page.tsx # Sanity Studio  (/studio)
  components/
    Header.tsx Footer.tsx Reveal.tsx rich.tsx SanityImage.tsx PostBody.tsx
    sections.tsx              # Page-builder renderer (block _type → component)
    ui/        # Button, Badge, Card, Icon, Stat, ServiceCard, Testimonial, FeatureItem, Input, Textarea
    layout/    # Container, Section, SectionHeading, ImagePlaceholder, CTABlock, LogoStrip
    interactive/ # TestimonialCarousel, ContactForm, AnchorNav
sanity/
  env.ts  structure.ts
  lib/      # client, image, fetch, queries, iconOptions
  schemaTypes/ # one file per content type + blocks.ts (section templates) + page.ts
sanity.config.ts  sanity.cli.ts  seed.ndjson
public/  fonts/ logo/
```

---

## 5. Still to wire up before launch

1. **Contact form** — shows a success state but doesn't send email yet. Wire
   `app/components/interactive/ContactForm.tsx` to a service (Formspree, Resend,
   or a Next.js Route Handler / Server Action).
2. **Real images & logos** — upload via the Studio image fields.
3. **LinkedIn URL** — set the real one in **Site Settings**.

---

## 6. Deploying to Vercel

1. Push this folder to a Git repo and import it at **vercel.com**.
2. Add the three `NEXT_PUBLIC_SANITY_*` environment variables (same as
   `.env.local`) in the Vercel project settings.
3. Deploy. Your Studio will be live at `your-domain.com/studio`.
4. Point your 123-reg domain at Vercel in the Vercel **Domains** settings.

> Tip: after the first deploy, add your Vercel URL to the Sanity project's
> **CORS origins** (sanity.io/manage → API → CORS) so the Studio can connect in
> production.
