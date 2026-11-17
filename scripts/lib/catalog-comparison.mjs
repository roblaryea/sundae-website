// API module rows are keyed products, not a display sequence. Preserve all values
// and ordered bands while ignoring non-semantic database row ordering.
export function normalizeCatalogComparison(catalog) {
  return { ...catalog, modules: [...catalog.modules].sort((a, b) => a.id.localeCompare(b.id)) }
}
