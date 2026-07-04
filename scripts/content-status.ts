import { EDITORIAL_PLAN, EDITORIAL_STATS, KNOWLEDGE_HUB } from '../src/lib/content-plan.ts';

import { getIctDateIso } from '../src/lib/timezone.ts';

const today = getIctDateIso();
const upcoming = EDITORIAL_PLAN.filter((item) => !item.alreadyLive && item.publishDate >= today).slice(0, 14);
const todayItems = EDITORIAL_PLAN.filter((item) => item.publishDate === today && !item.alreadyLive);

console.log('=== KIT Knowledge Hub — Editorial Status ===');
console.log(KNOWLEDGE_HUB.goalVi);
console.log(`Window: ${KNOWLEDGE_HUB.startDate} → ${KNOWLEDGE_HUB.endDate}`);
console.log('');
console.log('Stats:', EDITORIAL_STATS);
console.log('');
console.log(`Today (${today}): ${todayItems.length} article(s)`);
for (const item of todayItems) {
  console.log(`  - [${item.section}] ${item.titleVi} (${item.id})`);
}
console.log('');
console.log('Next 14 days:');
for (const item of upcoming) {
  console.log(`  ${item.publishDate}  [${item.section}/${item.category}] ${item.titleVi}`);
}
