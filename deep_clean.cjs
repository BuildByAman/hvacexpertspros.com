const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        if (file === 'node_modules' || file === '.git' || file === '_site') return;
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.njk') || file.endsWith('.js') || file.endsWith('.css') || file.endsWith('.json')) {
                // exclude states.js because it has city names like Electric City
                if (!file.includes('states.js') && !file.includes('scripts')) {
                    results.push(file);
                }
            }
        }
    });
    return results;
}

const files = walk(__dirname);

let replacedCount = 0;

for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Plumber replacements
    content = content.replace(/Plumbing Local Pros/gi, 'HVAC Experts Pros');
    content = content.replace(/plumbinglocalpros/gi, 'hvacexpertspros');
    content = content.replace(/PlumberPros/gi, 'HVACExperts');
    content = content.replace(/"Plumber"/g, '"HVACBusiness"');
    content = content.replace(/Need a Plumber/gi, 'Need an AC Technician');
    content = content.replace(/plumber/gi, 'AC technician');
    content = content.replace(/plumbing/gi, 'AC repair');
    
    // Electric replacements
    content = content.replace(/electricity is uniquely unforgiving/gi, 'HVAC issues can escalate quickly');
    content = content.replace(/electricity is inherently dangerous/gi, 'HVAC repair requires expert knowledge');
    content = content.replace(/electricity is seeking a path/gi, 'the system is severely malfunctioning');
    content = content.replace(/electricity is the invisible engine/gi, 'climate control is the invisible engine');
    
    content = content.replace(/Local Electrician Emergency/gi, 'HVAC Experts Pros');
    content = content.replace(/localelectricianemergency/gi, 'hvacexpertspros');
    
    content = content.replace(/electric vehicle \(EV\) charger/gi, 'high-efficiency AC system');
    content = content.replace(/electric vehicle charging stations?/gi, 'smart climate control hubs');
    content = content.replace(/electric vehicle/gi, 'smart home HVAC');
    content = content.replace(/electric vehicles?/gi, 'smart HVAC systems');
    
    content = content.replace(/electric bill/gi, 'energy bill');
    content = content.replace(/electrical fire/gi, 'HVAC breakdown');
    content = content.replace(/electrical/gi, 'HVAC');
    content = content.replace(/electricians?/gi, 'AC technicians');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Cleaned file:', file);
        replacedCount++;
    }
}

console.log('Total files cleaned:', replacedCount);
