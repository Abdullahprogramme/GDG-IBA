import assert from 'node:assert/strict';
import {test} from 'node:test';
import {eventSchema,gallerySchema,partnerSchema} from '../src/content/schemas.ts';
const event={title:'Sample event',slug:'sample-event',date:'2027-01-15T10:00:00Z',category:'workshop',status:'upcoming',cover:'/shapes/sample-photo.svg',summary:'Sample',description:'Sample',location:'Sample',mode:'onsite'};
test('events reject impossible dates and reversed durations',()=>{assert.equal(eventSchema.safeParse({...event,date:'not-a-date'}).success,false);assert.equal(eventSchema.safeParse({...event,endDate:'2027-01-14T10:00:00Z'}).success,false);assert.equal(eventSchema.safeParse({...event,endDate:'2027-01-15T11:00:00Z'}).success,true);});
test('gallery requires useful alternative text and positive image dimensions',()=>{const image={src:'/sample.svg',alt:'Sample artwork',album:'Sample',date:'2025-01-01',width:600,height:400};assert.equal(gallerySchema.safeParse(image).success,true);assert.equal(gallerySchema.safeParse({...image,alt:' ',width:0}).success,false);});
test('content external links reject executable and non-HTTPS URLs',()=>{for(const url of ['javascript:alert(1)','http://example.com','#'])assert.equal(partnerSchema.safeParse({name:'Sample',logo:'/sample.svg',url}).success,false);assert.equal(partnerSchema.safeParse({name:'Sample',logo:'/sample.svg',url:'https://example.com'}).success,true);});
