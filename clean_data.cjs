const fs = require('fs');

const path = require('path');

const dataDir = path.join(__dirname, 'data');
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.js'));

const replacements = [
  { regex: /AC repair panel upgrade/gi, replacement: 'HVAC system upgrade' },
  { regex: /AC repair panel/gi, replacement: 'HVAC system' },
  { regex: /emergency power restoration/gi, replacement: 'emergency AC restoration' },
  { regex: /circuit breaker repairs?/gi, replacement: 'thermostat repairs' },
  { regex: /whole-home wiring/gi, replacement: 'whole-home climate control' },
  { regex: /custom lighting installations?/gi, replacement: 'custom ductwork installations' },
  { regex: /National AC Repair Code \(NEC\)/gi, replacement: 'National HVAC Building Codes' },
  { regex: /sparking outlet/gi, replacement: 'freon leak' },
  { regex: /200-amp/gi, replacement: 'high-efficiency' },
  { regex: /Level 2 EV charger installation/gi, replacement: 'smart thermostat installation' },
  { regex: /pull(ed)? wires?/gi, replacement: 'installed ductwork' },
  { regex: /every wire pulled and breaker installed/gi, replacement: 'every unit installed and serviced' },
  { regex: /AC repair shorts/gi, replacement: 'compressor failures' },
  { regex: /outdated aluminum wiring/gi, replacement: 'outdated R-22 systems' },
  { regex: /standby generators?/gi, replacement: 'heat pumps' },
  { regex: /power demands?/gi, replacement: 'cooling demands' },
  { regex: /preventing AC repair fires/gi, replacement: 'preventing system breakdowns' },
  { regex: /keeping your lights on/gi, replacement: 'keeping your home cool' },
  { regex: /AC repair/gi, replacement: 'AC repair' }, // Just to normalize casing if needed, but wait, it's already 'AC repair'
  // Fix weird 'AC repair repair' typo
  { regex: /AC repair repair/gi, replacement: 'AC repair' },
];

for (const file of files) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const { regex, replacement } of replacements) {
    content = content.replace(regex, replacement);
  }

  // General plumbing terms in case they slipped through
  content = content.replace(/plumbing/gi, 'AC repair');
  content = content.replace(/plumber/gi, 'AC technician');
  content = content.replace(/electrical/gi, 'AC repair');
  content = content.replace(/electrician/gi, 'AC technician');
  content = content.replace(/pipe repair/gi, 'AC repair');
  content = content.replace(/drain cleaning/gi, 'duct cleaning');
  content = content.replace(/water heater/gi, 'furnace heating');
  content = content.replace(/leak detection/gi, 'refrigerant leak detection');
  content = content.replace(/sewer services/gi, 'commercial HVAC services');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Cleaned plumbing/electrical terms in ${file}`);
  }
}
