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
            if (file.endsWith('.njk')) {
                results.push(file);
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

    content = content.replace(/"@type": "AC Technician"/g, '"@type": "HVACBusiness"');
    
    // Just in case it's lowercased
    content = content.replace(/"@type": "AC technician"/g, '"@type": "HVACBusiness"');

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed schema in:', file);
        replacedCount++;
    }
}

console.log('Total files fixed:', replacedCount);
