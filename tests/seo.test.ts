import assert from 'node:assert/strict';
import { test } from 'node:test';
import { canonicalUrl, eventSchema, organizationSchema, serializeSchema } from '../src/lib/seo.ts';
import type { EventRecord } from '../src/lib/events.ts';
const event: EventRecord = {id:'fixture',slug:'fixture',title:'Fixture workshop',sample:false,date:'2027-01-01T09:00:00Z',category:'workshop',status:'upcoming',cover:'/images/community-study.svg',summary:'Fixture',description:'Fixture description',location:'Fixture room, Karachi',mode:'onsite',tags:[],speakers:[],agenda:[],gallery:[]};
test('canonical URLs remove query, fragments and trailing slashes', () => {
  assert.equal(canonicalUrl('/events/?year=2027#grid','https://example.com'), 'https://example.com/events');
  assert.equal(canonicalUrl('/','https://example.com'), 'https://example.com/');
});
test('structured data excludes samples, retains confirmed data and never invents fees or online locations', () => {
  assert.equal(eventSchema({...event,sample:true},'https://example.com'), undefined);
  assert.equal(eventSchema({...event,mode:'online'},'https://example.com'), undefined);
  const result=eventSchema(event,'https://example.com')!;
  assert.equal(result.name,event.title); assert.equal(result.startDate,event.date);
  assert.equal(result.image[0],'https://example.com/images/community-study.svg');
  assert.equal('offers' in result,false);
  assert.equal(organizationSchema('https://example.com').name,'Google Developer Groups on Campus Institute of Business Administration');
});
test('JSON-LD text cannot escape its script element', () => {
  const text=serializeSchema({name:'</script><script>alert(1)</script>'});
  assert.equal(text.includes('<'),false);
  assert.equal(JSON.parse(text).name,'</script><script>alert(1)</script>');
});
