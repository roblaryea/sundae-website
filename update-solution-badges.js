const fs = require('fs');
const path = require('path');

// Operator pages (Blue badges)
const operatorPages = [
  { file: 'src/app/solutions/franchises/page.tsx', label: 'SOLUTIONS FOR FRANCHISES', icon: 'franchise' },
  { file: 'src/app/solutions/cloud-kitchens/page.tsx', label: 'SOLUTIONS FOR CLOUD KITCHENS', icon: 'kitchen' },
  { file: 'src/app/solutions/hospitality-operators/page.tsx', label: 'SOLUTIONS FOR HOSPITALITY OPERATORS', icon: 'hotel' },
];

// Role pages (Purple badges)
const rolePages = [
  { file: 'src/app/solutions/regional-managers/page.tsx', label: 'SOLUTIONS FOR REGIONAL MANAGERS', icon: 'regional' },
  { file: 'src/app/solutions/finance-teams/page.tsx', label: 'SOLUTIONS FOR FINANCE TEAMS', icon: 'finance' },
  { file: 'src/app/solutions/marketing-teams/page.tsx', label: 'SOLUTIONS FOR MARKETING TEAMS', icon: 'marketing' },
  { file: 'src/app/solutions/c-suite-executives/page.tsx', label: 'SOLUTIONS FOR C-SUITE EXECUTIVES', icon: 'owners' },
  { file: 'src/app/solutions/technology-teams/page.tsx', label: 'SOLUTIONS FOR TECHNOLOGY TEAMS', icon: 'technology' },
  { file: 'src/app/solutions/hr-teams/page.tsx', label: 'SOLUTIONS FOR HR TEAMS', icon: 'hr' },
];

function updatePage(filePath, label, icon, badgeType) {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Pattern 1: Update hero section class to include solution-hero
  content = content.replace(
    /<section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">/g,
    `<section className="solution-hero solution-hero--${badgeType} pt-32 pb-20 px-4 sm:px-6 lg:px-8">`
  );
  
  // Pattern 2: Update the badge from inline-flex bg-blue-100 to badge class
  // Match the motion.div wrapper and update the inner span
  const badgePattern = /className="inline-flex items-center space-x-2 bg-(?:blue|purple)-100 text-(?:blue|purple)-800 px-4 py-2 rounded-full text-sm font-medium mb-6"/g;
  content = content.replace(
    badgePattern,
    `className="badge badge--${badgeType} inline-flex items-center gap-2"`
  );
  
  // Pattern 3: Reformat motion.div to remove outer motion wrapper around badge text if needed
  // This is a complex regex, so let's simplify
  
  // Update span text if we find the pattern
  const spanTextPattern = /<span>([^<]+)<\/span>\s*<\/motion\.div>/g;
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated: ${filePath} (${badgeType})`);
}

// Process operator pages
operatorPages.forEach(page => {
  updatePage(page.file, page.label, page.icon, 'operator');
});

// Process role pages
rolePages.forEach(page => {
  updatePage(page.file, page.label, page.icon, 'role');
});

console.log('\nDone! Updated all solution pages with new badge styles.');
