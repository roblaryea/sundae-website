const fs = require('fs');
const path = require('path');

// Mapping old products to new products based on context
const replacements = [
  // Sundae Canvas → Sundae Core (real-time dashboards)
  { old: /Sundae Canvas/g, new: 'Sundae Core', context: 'dashboard' },
  
  // Sundae Insights → Sundae Core (with AI insights)
  { old: /Sundae Insights/g, new: 'Sundae Core', context: 'insights' },
  
  // Sundae Nexus → Sundae Core (conversational intelligence)
  { old: /Sundae Nexus/g, new: 'Sundae Core', context: 'queries' },
];

// Files to process (solution pages, resources, docs)
const files = [
  'src/app/solutions/c-suite-executives/page.tsx',
  'src/app/solutions/finance-teams/page.tsx',
  'src/app/solutions/marketing-teams/page.tsx',
  'src/app/solutions/technology-teams/page.tsx',
  'src/app/solutions/hr-teams/page.tsx',
  'src/app/solutions/regional-managers/page.tsx',
  'src/app/solutions/franchises/page.tsx',
  'src/app/solutions/hospitality-operators/page.tsx',
  'src/app/solutions/multi-location-groups/page.tsx',
  'src/app/solutions/cloud-kitchens/page.tsx',
  'src/app/resources/page.tsx',
  'src/app/docs/page.tsx',
];

function processFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return false;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  let replacementCount = 0;
  
  // Apply replacements
  for (const replacement of replacements) {
    const matches = content.match(replacement.old);
    if (matches) {
      content = content.replace(replacement.old, replacement.new);
      replacementCount += matches.length;
      modified = true;
      console.log(`  ✓ Replaced ${matches.length}x "${replacement.old.source}" with "${replacement.new}"`);
    }
  }
  
  // Also update icon references
  const iconReplacements = [
    { old: /"canvas"/g, new: '"chart"' },
    { old: /"nexus"/g, new: '"intelligence"' },
    { old: /icon: "canvas"/g, new: 'icon: "chart"' },
    { old: /icon: "nexus"/g, new: 'icon: "intelligence"' },
  ];
  
  for (const iconRep of iconReplacements) {
    const matches = content.match(iconRep.old);
    if (matches) {
      content = content.replace(iconRep.old, iconRep.new);
      console.log(`  ✓ Updated ${matches.length}x icon references`);
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Updated: ${filePath} (${replacementCount} product references)\n`);
    return true;
  } else {
    console.log(`⏭️  No changes: ${filePath}\n`);
    return false;
  }
}

console.log('🔄 Starting product reference updates...\n');
console.log('Replacing old products with new structure:');
console.log('  • Sundae Canvas  → Sundae Core');
console.log('  • Sundae Insights → Sundae Core');
console.log('  • Sundae Nexus   → Sundae Core\n');
console.log('═'.repeat(60));

let updatedCount = 0;
let skippedCount = 0;

for (const file of files) {
  console.log(`\n📄 Processing: ${file}`);
  if (processFile(file)) {
    updatedCount++;
  } else {
    skippedCount++;
  }
}

console.log('\n' + '═'.repeat(60));
console.log(`\n✅ Complete!`);
console.log(`   Updated: ${updatedCount} files`);
console.log(`   Skipped: ${skippedCount} files`);
console.log(`\n🎯 All old product references updated to new structure\n`);
