# Verification record

## Completed

- TypeScript strict type check: passed.
- Production Vinext / Cloudflare Worker build: passed.
- 17 automated checks: passed, covering full and compact contracts, invalid boxes/categories/quantities, empty results, truncation, JSON retry, quota errors, missing credentials, impact filtering, and specialist disposal.
- Desktop browser inspection at 1440 × 1000 and mobile at 390 × 844.
- No page exceptions recorded during those browser checks.
- Mobile horizontal overflow: none.
- Sample: three item cards and three matching annotation boxes.
- Disposal tab and country guidance rendered correctly.
- Dark mode, material filter, and empty history verified.
- Real JPEG uploaded and decoded into a 1200 × 800 preview.
- PDF export downloaded successfully (12,666 bytes in the sample check).
- Supplied Groq credential authenticated; requested model available.

## Live-photo smoke tests

Fixtures use five public photos (four waste scenes and one forest), four degraded/rotated variants, and one blank image. These are ten input scenarios, **not ten independently labelled accuracy benchmarks**. Smoke tests verify request/response behavior, not exhaustive visual accuracy.

Successful compact-mode tests included beach litter (4 groups, 3.57 s), overflowing bin (6 groups, 1.69 s), glass/can litter (4 groups, 1.12 s), blurred litter (empty result with retake guidance, 0.73 s), forest (empty, 1.10 s), and blank image (empty, 0.53 s). A full-mode field scene also returned a valid report during initial testing.

The dense field scene did not consistently fit the compact contract and returned the controlled retake error after retry. Some dark, low-resolution and rapid repeated tests hit the account quota. Do not interpret those provider rejections as successful detections. `work/photo-tests` is transient QA data and intentionally excluded from the source distribution.

Observed account limits included 8,000 input/total tokens per minute and an enforced 1,000 output tokens per minute. Compact mode disables model reasoning and reserves 900 output tokens. Actual limits and available models may change. A higher-quota account is needed for sustained scans and large direct AI reports.

Photo references: [field](https://unsplash.com/photos/KNG8l86Qbjo), [beach](https://unsplash.com/photos/AGz6-r_mgaw), [overflowing bin](https://unsplash.com/photos/WrCFJbQeGd4), [glass/can litter](https://unsplash.com/photos/AXjFdAGt-AM), [forest](https://unsplash.com/photos/cEp2Tow6XKk). Images are used only as local test inputs; the product's sample is an original SVG illustration.

## Not certified

Lighthouse 90+, WCAG AA conformance, sub-eight-second latency for all scenes, exhaustive object detection, scientific impact accuracy, and broad device coverage have not been independently certified. No claim of those guarantees is made. Optional EcoBot is not implemented. The owner subsequently requested public access without login. Groq quotas remain account-wide; durable per-user rate limiting is not included.

## Minimal UI revision — 15 October 2026

Replaced the marketing layout with a single upload/camera → analyze → five-card interface. The detector, compression, request contract and server route are unchanged. Checked desktop at 1440px and mobile at 390px: five cards, no horizontal overflow, material selection updates action cards, regional guidance changes, dark mode, and real JPEG preview. A controlled API fixture verified the scan beam, disabled analyze button and successful transition to the new report. The original live API tests above describe the unchanged detection path.

## Vercel target validation

Next.js 16.3.4 production webpack build: passed. Strict TypeScript: passed. All 17 automated contract checks: passed. Local production server: homepage 200 with the upload UI; invalid image 400; missing server credential 503. The Vercel account deployment and live Groq verification are pending access to the newly connected Vercel tools. No Vercel deployment has been created yet.

Vercel connection became available. Listing projects for workspace adithya-bandela-eco-vision-gen-ai returned 403 forbidden: the connected authorization has no access to that workspace. No project or deployment was created. Grant the Vercel integration access to the requested workspace before resuming.

## Vercel production deployment

Project adithya-bandela-eco-vision (prj_5a39Ur3i0AEVJDY4prbhdHoNIb5G) created in the requested workspace. Production deployment dpl_GABdDxXJ5fYCF29e4U8Hdb3sr3Dr is READY at https://adithya-bandela-eco-vision.vercel.app. Public homepage 200; mobile sample 5 cards, no overflow or page errors. Live vision not yet enabled: automatic approval review rejected storing the existing Groq key in this new project without explicit destination-specific user approval. API returns controlled 503 until approved and configured.

## Secret-enabled production verification

The user explicitly approved storing the existing Groq key in this project production environment. GROQ_API_KEY was saved as a sensitive server variable and deployment dpl_6xJYw8dfnqH2uUSmi5NJmV6L7C9V reached READY. A real photo uploaded through the public browser UI returned HTTP 200 in 3.315 seconds, with four material groups. Five result cards rendered on a 390px viewport without horizontal overflow or page exceptions. Loaded client scripts did not contain a Groq key. This is one smoke test, not an accuracy or latency guarantee.
