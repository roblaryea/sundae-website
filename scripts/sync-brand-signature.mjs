import fs from 'node:fs';

// Deliberately offline. The reviewed signature is shared with the pricing site.
const signature = JSON.parse(fs.readFileSync('src/content/brand-signature.json', 'utf8'));
const navigation = {};
for (const [locale, copy] of Object.entries(signature)) {
  const file = `src/content/operator-workflows/${locale}.json`;
  const workflow = JSON.parse(fs.readFileSync(file, 'utf8'));
  Object.assign(workflow.brand, {
    homeHeadline: copy.headline,
    homeTagline: copy.decision,
    homeOutcome: copy.outcome,
    sub: copy.support,
    description: copy.support,
  });
  fs.writeFileSync(file, `${JSON.stringify(workflow, null, 2)}\n`);
  navigation[locale] = {
    brand: workflow.brand,
    links: workflow.links,
    crewExample: {
      industry: workflow.pages['restaurant-task-management'].challenges[0],
      sundae: workflow.pages['restaurant-task-management'].description,
    },
  };
}
fs.writeFileSync('src/content/operator-workflows/navigation.ts', `// Generated from the reviewed workflow locale files.\nexport const operatorNavigationCopy = ${JSON.stringify(navigation, null, 2)} as const;\n`);
