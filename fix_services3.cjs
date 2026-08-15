const fs = require('fs');

try {
  let content = fs.readFileSync('src/services/index.njk', 'utf8');

  // 1. Fix icons
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

  // 2. Fix the plumbing text
  content = content.replace(/Plumbing Services/g, 'AC Repair Services');
  content = content.replace(/plumbers/g, 'AC technicians');
  content = content.replace(/plumbing/g, 'AC repair');
  content = content.replace(/wiring upgrade, panel repair, outlet repair/g, 'installation, maintenance, duct cleaning');
  
  // 3. Fix the banner image column missing
  const injectImg = `        </div>
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
      </div>
    </div>
  </div>
</div>

{# ── Services Grid`;

  content = content.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*{# ── Services Grid/m, injectImg);

  fs.writeFileSync('src/services/index.njk', content, 'utf8');
  console.log('Fixed services/index.njk');
} catch(e) {
  console.error(e);
}
