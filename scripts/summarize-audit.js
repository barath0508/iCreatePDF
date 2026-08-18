const data = require('./seo-audit-result.json');
const missingKW = data.filter(d => d.keywordCount === 0);
const lowKW = data.filter(d => d.keywordCount < 10);
const noFaq = data.filter(d => !d.hasFaq && d.dir !== 'no-upload-pdf-tools');
const noHowTo = data.filter(d => !d.hasHowTo && d.dir !== 'no-upload-pdf-tools');
const noToolSchema = data.filter(d => !d.hasToolSchema && d.dir !== 'no-upload-pdf-tools');

console.log('Total tools:', data.length);
console.log('Missing keywords:', missingKW.length);
console.log('Low keywords (<10):', lowKW.length, lowKW.map(d => d.dir + '(' + d.keywordCount + ')'));
console.log('No FAQ schema (excluding hub):', noFaq.length, noFaq.map(d => d.dir));
console.log('No HowTo schema (excluding hub):', noHowTo.length, noHowTo.map(d => d.dir));
console.log('No Tool schema (excluding hub):', noToolSchema.length, noToolSchema.map(d => d.dir));
