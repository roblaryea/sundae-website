#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/lib/blogData.ts');
let content = fs.readFileSync(filePath, 'utf8');

console.log('🔄 Starting blog product reference updates...\n');
console.log('Mapping old architecture products to new product tiers:');
console.log('  • Sundae Canvas/Insights/Nexus/Forge → Sundae Core (real-time features)');
console.log('  • Canvas Engine, Pulse → Keep as architecture references\n');

let changeCount = 0;

// Strategy: Replace references to products as purchasable items with Core
// But keep technical/architecture references

// Pattern 1: "Sundae Canvas" when referring to the product → "Sundae Core"
// But keep "Canvas Engine" and "Sundae Canvas Engine"
const canvasPattern = /Sundae Canvas(?! Engine)/g;
const canvasMatches = content.match(canvasPattern) || [];
if (canvasMatches.length > 0) {
  content = content.replace(canvasPattern, 'Sundae Core');
  console.log(`✓ Replaced ${canvasMatches.length}x "Sundae Canvas" with "Sundae Core"`);
  changeCount += canvasMatches.length;
}

// Pattern 2: "Sundae Insights" → "Sundae Core" (anomaly detection is part of Core)
const insightsPattern = /Sundae Insights/g;
const insightsMatches = content.match(insightsPattern) || [];
if (insightsMatches.length > 0) {
  content = content.replace(insightsPattern, 'Sundae Core');
  console.log(`✓ Replaced ${insightsMatches.length}x "Sundae Insights" with "Sundae Core"`);
  changeCount += insightsMatches.length;
}

// Pattern 3: "Sundae Nexus" → "Sundae Core" (conversational AI is part of Core)
const nexusPattern = /Sundae Nexus/g;
const nexusMatches = content.match(nexusPattern) || [];
if (nexusMatches.length > 0) {
  content = content.replace(nexusPattern, 'Sundae Core');
  console.log(`✓ Replaced ${nexusMatches.length}x "Sundae Nexus" with "Sundae Core"`);
  changeCount += nexusMatches.length;
}

// Pattern 4: "Sundae Forge" → "Sundae Core" (predictive analytics is part of Core)
const forgePattern = /Sundae Forge/g;
const forgeMatches = content.match(forgePattern) || [];
if (forgeMatches.length > 0) {
  content = content.replace(forgePattern, 'Sundae Core');
  console.log(`✓ Replaced ${forgeMatches.length}x "Sundae Forge" with "Sundae Core"`);
  changeCount += forgeMatches.length;
}

// Pattern 5: Keep "Sundae Scout" and "Canvas Engine" - these are architecture references

// Write updated content
if (changeCount > 0) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`\n✅ Updated blogData.ts with ${changeCount} product reference changes\n`);
  console.log('📝 Note: Kept "Sundae Scout", "Canvas Engine", and "Pulse" as architecture references');
} else {
  console.log('\n✅ No changes needed - blog references already updated\n');
}
