const fs = require('fs');

try {
  // 1. Fix CSS sticky header
  let cssFile = 'styles/globals.css';
  let css = fs.readFileSync(cssFile, 'utf8');
  css = css.replace(/\.container \{ padding: 0 20px; overflow-x: hidden; \}/g, '.container { padding: 0 20px; overflow-x: clip; }');
  css = css.replace(/body, html \{\s*overflow-x: hidden;/g, 'body, html {\n  overflow-x: clip;');
  fs.writeFileSync(cssFile, css, 'utf8');

  // 2. Fix layout.njk (email and icons)
  let layoutFile = 'src/_includes/layout.njk';
  let layout = fs.readFileSync(layoutFile, 'utf8');
  layout = layout.replace(/info@AC technicianproslocal\.com/g, 'info@hvacexpertspros.com');
  layout = layout.replace(/class="ph ph-drop"/g, 'class="ph ph-snowflake"');
  fs.writeFileSync(layoutFile, layout, 'utf8');
  
  // 3. Fix contact.njk (email)
  let contactFile = 'src/contact.njk';
  let contact = fs.readFileSync(contactFile, 'utf8');
  contact = contact.replace(/info@AC technicianproslocal\.com/g, 'info@hvacexpertspros.com');
  fs.writeFileSync(contactFile, contact, 'utf8');

  console.log('Fixed sticky CSS, email, and plumbing icons.');
} catch(e) {
  console.error(e);
}
