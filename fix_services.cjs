const fs = require('fs');

try {
  let content = fs.readFileSync('src/services/index.njk', 'utf8');
  let original = content;

  // 1. Fix the serviceIcons mapping
  const oldIconsRegex = /\{% set serviceIcons = \{[\s\S]*?\} %\}/;
  const newIcons = `{% set serviceIcons = {
  'ac-repair': 'ph-wrench',
  'ac-installation': 'ph-thermometer',
  'hvac-maintenance': 'ph-gear',
  'emergency-ac-repair': 'ph-siren',
  'duct-cleaning-repair': 'ph-wind',
  'furnace-heating-repair': 'ph-fire',
  'commercial-hvac': 'ph-buildings',
  'indoor-air-quality': 'ph-leaf'
} %}`;
  content = content.replace(oldIconsRegex, newIcons);

  // 2. Fix the banner image column missing
  const missingImgHtml = `      <div class="banner-content-col">
        <div class="banner-content">
          <div class="sub-label">
            <i class="ph ph-map-pin" style="font-size:12px"></i>
            Our Services
          </div>
          <h1 class="title">
            AC Repair Services <span id="svcLocationSpan">Near You</span>
          </h1>
          <p class="description" id="svcBannerDesc">
            Find reliable and licensed local AC technicians near you. Same day service available — call us 24/7 for emergency
            AC repair, installation, maintenance &amp; more.
          </p>
          <div class="btn-part">
            <a class="readon orange modern-btn" href="{{ site.PHONE_HREF }}">
              <i class="ph ph-phone-call" style="font-size:17px"></i>
              {{ site.PHONE }}
            </a>
          </div>
        </div>
      </div>
      <div class="banner-img-col">
        <div class="modern-img-box">
          <div class="img-backdrop"></div>
          <img src="/assets/images/ac_repair.webp" alt="AC Technician Services">
          <div class="floating-badge">
            <div class="badge-icon"><i class="ph ph-wrench"></i></div>
            <div class="badge-text">
              <strong>Expert</strong><br>Technicians
            </div>
          </div>
        </div>
      </div>`;

  content = content.replace(/<div class=\"banner-content-col\">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div class=\"rs-services\">/,
    missingImgHtml + '\n    </div>\n  </div>\n</div>\n\n{# ── Services Grid ─────────────────────────────────────────────────────── #}\n<div class="rs-services">');

  if (content !== original) {
    fs.writeFileSync('src/services/index.njk', content, 'utf8');
    console.log('Fixed services/index.njk');
  } else {
    console.log('No changes made to services/index.njk');
  }
} catch(e) {
  console.error(e);
}
