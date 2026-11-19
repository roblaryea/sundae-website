# Three-scene service backdrop

## Approved scope

The owner approved returning the existing service film to Home's “See it live” section and explicitly requires retaining its full stitched sequence of three videos. The original MP4 and WebM remain unchanged. This is ambient illustration, not customer evidence or a product walkthrough.

Visual thesis: a warm service scene behind the chapter opening, with a quiet fade into the stable Pulse example.

Content plan: preserve the approved hero, signature, live-section copy, product illustration and disclosure; replace the live chapter's static background photos with the original three-scene film and its poster.

Interaction thesis: play the full muted, inline loop while its background area is visible, pause offscreen or in hidden tabs, and provide a discreet localized play/pause control. No-JavaScript and reduced-motion visitors receive the still image. The first hero viewport does not request this video.

## Asset authority

- MP4: `public/videos/manifesto-room.mp4`, 1280×720, 24fps, 22.416667 seconds, SHA-256 `702c376b1cb8884106ab6290ae7b7307d9fd4aaaa69c30c7927d6c86f0f65705`.
- WebM: `public/videos/manifesto-room.webm`, 22.417 seconds, SHA-256 `d25b8a237c1174a651632a34091301c19885392094f8901f97585294bba8ac27`.
- Existing poster: `public/videos/manifesto-room-poster.jpg`.

The film disappeared when PR218 removed the old SectionManifesto from Home on 16 November. The asset and component were retained. This change reuses the film in the current live chapter and does not restore the removed narrative sections.

## Mobile header hierarchy

The owner subsequently supplied a mobile-footer screenshot and requested a stronger distinction between main and subordinate navigation. The existing SEO/GEO author owns the Footer correction, with this chat providing independent review. This cut also refines the mobile header menu: logical-start inset under each top-level section, a second inset and quiet start rail for Core/Crew workflows and Solutions subgroups, and 44px minimum child-link targets. Desktop menus, destinations, tracking, focus management and scroll locking are unchanged.

## Validation

Full build with all required prebuild/postbuild gates passes; 223 SEO tests and targeted lint pass. Original media SHA-256 values match the asset authority above, and both play/pause labels exist in all 22 locales.

Six actual browser layouts cover EN1440 and390 in both themes, AR390light and DE1024dark. Each confirms no film request in the initial hero, then the original22.417s muted inline loop, localized44px control, all three scenes, loaded poster and no page errors/horizontal overflow. Keyboard pause/resume, persistence of user pause through offscreen scrolling, automatic offscreen pause/resume and live reduced-motion changes pass. Reduced-motion and no-JavaScript cases mount no video and request neither film source. Blocking WebM successfully plays MP4; blocking both formats leaves the poster and removes the unavailable control.

The first format-failure check caught React bubbling individual source errors into the video handler. The corrected implementation waits for a terminal video error or failure of both formats. The successful finite retake is retained in `behavior-receipt.json` alongside the layout receipt.

Continuous playback observations show the clock restarting while ready/unpaused across the original full loop. Screenshot capture load made the initial wall-time assertion too strict; the actual native time resets are retained, without claiming a frame-rate or performance uplift. Browser automation did not expose a hidden native tab, so no physical tab-hide validation is claimed; the visibility-change pause handler is present.

Mobile header runtime review passes six cases: EN390dark/light, EN320dark, AR390light, DE390dark and EN1024light. Actual text starts show 16px from section to parent and a further21px from parent to children (mirrored in RTL). Every workflow has its own row and at least44px height. Collapse/inert behavior, Escape/focus return, real scheduling-link navigation, drawer closure, scroll unlock and no page errors pass. Results are in `navigation-receipt.json`; representative final images are in `evidence/`. The explicit full row width also accounts for the existing unlayered `nav a` display rule.

Independent review/publication by the existing SEO/GEO chat is pending. Independent review should check all three scenes, both scene transitions and the loop restart, mobile framing, both themes, localized control, keyboard pause/play, offscreen/tab pausing, media-error and reduced-motion/no-JavaScript fallback, and the initial absence of requests for this film.
