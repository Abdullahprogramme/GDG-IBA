import test from 'node:test';
import assert from 'node:assert/strict';
import { partitionTeam, teamLinks, type TeamRecord } from '../src/lib/team.ts';
const person=(id:string,props:Partial<TeamRecord>={}):TeamRecord=>({id,name:id,role:'Member',department:'Tech',photo:'/test.svg',isLead:false,isCoLead:false,order:0,sample:false,alumni:false,links:{},...props});
test('team partitions current leadership, advisors, departments and alumni without mutation',()=>{
 const input=[person('past',{alumni:true,isLead:true}),person('co',{isCoLead:true}),person('lead',{isLead:true}),person('advisor',{role:'Faculty Advisor'}),person('design',{department:'Design'}),person('tech')];
 const before=JSON.stringify(input),result=partitionTeam(input);
 assert.deepEqual(result.leads.map(p=>p.id),['lead','co']);assert.deepEqual(result.advisors.map(p=>p.id),['advisor']);assert.deepEqual(result.departments.map(d=>d.name),['Design','Tech']);assert.deepEqual(result.alumni.map(p=>p.id),['past']);assert.equal(JSON.stringify(input),before);
});
test('confirmed team replaces demonstrations and empty/explicit advisor records work',()=>{
 assert.equal(partitionTeam([person('sample',{sample:true}),person('real')]).departments[0].people.length,1);
 assert.equal(partitionTeam([person('advisor',{isAdvisor:true})]).advisors.length,1);
 assert.deepEqual(partitionTeam([]),{leads:[],advisors:[],departments:[],alumni:[]});
});
test('team actions require confirmed profiles, HTTPS socials and valid email',()=>{
 const links={linkedin:'https://example.com/lead',github:'javascript:alert(1)',email:'hello@example.com'};
 assert.deepEqual(teamLinks(person('sample',{sample:true,links})),[]);
 assert.deepEqual(teamLinks(person('real',{links})),[{kind:'linkedin',href:'https://example.com/lead'},{kind:'email',href:'mailto:hello%40example.com'}]);
 assert.deepEqual(teamLinks(person('bad',{links:{email:'bad\naddress',linkedin:'http://example.com'}})),[]);
});
