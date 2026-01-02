const fs = require('fs');
const path = require('path');

// Emoji to SundaeIcon mapping
const emojiMap = {
  '💰': 'finance',
  '📊': 'chart',
  '👥': 'operators',
  '🚀': 'growth',
  '🎨': 'creative',
  '💻': 'technology',
  '👔': 'executive',
  '🏪': 'franchise',
  '🏢': 'building',
  '🏨': 'hospitality',
  '📈': 'trending',
  '💡': 'insights',
  '📝': 'document',
  '📚': 'learning',
  '🔒': 'security',
  '📋': 'checklist',
  '🎉': 'celebrate',
};

// Files to process
const files = [
  'src/app/pricing/page.tsx',
  'src/app/careers/page.tsx',
  'src/app/nexus/page.tsx',
  'src/app/4d-intelligence/page.tsx',
  'src/app/canvas/page.tsx',
  'src/app/product/canvas/page.tsx',
  'src/app/docs/page.tsx',
  'src/app/product/sundae-report/page.tsx',
  'src/app/blog/page.tsx',
  'src/app/solutions/hr-teams/page.tsx',
  'src/app/resources/page.tsx',
  'src/app/solutions/c-suite-executives/page.tsx',
  'src/app/solutions/finance-teams/page.tsx',
  'src/app/solutions/technology-teams/page.tsx',
  'src/app/solutions/franchises/page.tsx',
  'src/app/solutions/marketing-teams/page.tsx',
  'src/app/solutions/cloud-kitchens/page.tsx',
  'src/app/solutions/hospitality-operators/page.tsx',
  'src/app/terms/page.tsx',
  'src/app/solutions/regional-managers/page.tsx',
  'src/app/solutions/multi-location-groups/page.tsx',
  'src/app/privacy/page.tsx',
  'src/app/tools/benchmark-readiness/page.tsx',
  'src/app/tools/labor-analyzer/page.tsx',
  'src/app/tools/multi-location-uplift/page.tsx',
  'src/app/insights/page.tsx',
];

function processFile(filePath) {
  const fullPath = path.join(__dirname, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  let modified = false;
  
  // Check if SundaeIcon is already imported
  const hasSundaeIcon = content.includes('import') && content.includes('SundaeIcon');
  
  // Replace each emoji
  for (const [emoji, iconName] of Object.entries(emojiMap)) {
    const emojiPattern = new RegExp(`<span>${emoji}</span>`, 'g');
    if (content.match(emojiPattern)) {
      content = content.replace(emojiPattern, `<SundaeIcon name="${iconName}" size="md" />`);
      modified = true;
      console.log(`  ✓ Replaced ${emoji} with ${iconName} icon`);
    }
  }
  
  // Add import if needed and file was modified
  if (modified && !hasSundaeIcon) {
    // Find the last import statement
    const importMatch = content.match(/import[^;]+;/g);
    if (importMatch) {
      const lastImport = importMatch[importMatch.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport);
      const afterLastImport = lastImportIndex + lastImport.length;
      
      content = content.slice(0, afterLastImport) + 
                '\nimport { SundaeIcon } from \'@/components/icons\';' +
                content.slice(afterLastImport);
      
      console.log(`  ✓ Added SundaeIcon import`);
    }
  }
  
  if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Updated: ${filePath}\n`);
    return true;
  } else {
    console.log(`⏭️  No changes: ${filePath}\n`);
    return false;
  }
}

console.log('🧹 Starting emoji removal process...\n');
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
console.log(`\n🎯 All emojis replaced with SundaeIcon components\n`);
