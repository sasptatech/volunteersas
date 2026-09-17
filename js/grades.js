// grades.js — SAS grade levels and the class-of / division math.
//
// At sign-up a parent picks their child's CURRENT grade. We store the derived
// graduation year ("Class of YYYY") — which never goes stale — and derive the
// current grade + division back from it whenever we need them.

// ord is the offset from Grade 12 (which graduates this school year). div maps to
// the app's existing division ids (le/ue/ms/hs) used to tag events.
export const GRADES = [
  { id: 'ps',  label: 'Pre-School',       ord: -2, div: 'le' },
  { id: 'pk',  label: 'Pre-Kindergarten', ord: -1, div: 'le' },
  { id: 'k',   label: 'Kindergarten',     ord: 0,  div: 'le' },
  { id: 'g1',  label: 'Grade 1',  ord: 1,  div: 'le' },
  { id: 'g2',  label: 'Grade 2',  ord: 2,  div: 'le' },
  { id: 'g3',  label: 'Grade 3',  ord: 3,  div: 'ue' },
  { id: 'g4',  label: 'Grade 4',  ord: 4,  div: 'ue' },
  { id: 'g5',  label: 'Grade 5',  ord: 5,  div: 'ue' },
  { id: 'g6',  label: 'Grade 6',  ord: 6,  div: 'ms' },
  { id: 'g7',  label: 'Grade 7',  ord: 7,  div: 'ms' },
  { id: 'g8',  label: 'Grade 8',  ord: 8,  div: 'ms' },
  { id: 'g9',  label: 'Grade 9',  ord: 9,  div: 'hs' },
  { id: 'g10', label: 'Grade 10', ord: 10, div: 'hs' },
  { id: 'g11', label: 'Grade 11', ord: 11, div: 'hs' },
  { id: 'g12', label: 'Grade 12', ord: 12, div: 'hs' },
];

// The calendar year the CURRENT Grade 12 cohort graduates. The school year flips
// in August, so from August onward the current seniors graduate NEXT year.
export function currentGradYear(d = new Date()) {
  return d.getMonth() >= 7 ? d.getFullYear() + 1 : d.getFullYear();
}

// Graduation year for a child currently in the given grade.
export function classOfForGrade(gradeId, d = new Date()) {
  const g = GRADES.find(x => x.id === gradeId);
  return g ? currentGradYear(d) + (12 - g.ord) : null;
}

// Current grade for a stored graduation year (inverse of classOfForGrade).
// Returns null once the child has graduated (or isn't in a grade band).
export function gradeFromClassOf(year, d = new Date()) {
  const ord = 12 - (year - currentGradYear(d));
  return GRADES.find(g => g.ord === ord) || null;
}

// Unique current divisions for a list of graduation years (graduated kids skipped).
export function divisionsForClassOf(classOf, d = new Date()) {
  const out = new Set();
  (classOf || []).forEach(y => { const g = gradeFromClassOf(y, d); if (g) out.add(g.div); });
  return [...out];
}

// A short human summary of someone's affiliation, e.g. "Grade 4 · Kindergarten · Staff".
export function affiliationLabel(profile, d = new Date()) {
  const parts = (profile.classOf || [])
    .map(y => gradeFromClassOf(y, d))
    .filter(Boolean)
    .map(g => g.label);
  if (profile.staff) parts.push('Staff');
  if (profile.alumni) parts.push('Alumni');
  return parts.join(' · ');
}
