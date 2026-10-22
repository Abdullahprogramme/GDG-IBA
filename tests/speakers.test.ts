import assert from "node:assert/strict";
import { test } from "node:test";
import { availableSpeakerFilters, filterSpeakers, speakerCategory, speakerEvents, pastSpeakerGroups, type SpeakerRecord } from "../src/lib/speakers.ts";
import type { EventRecord } from "../src/lib/events.ts";
const speaker:SpeakerRecord={id:"speaker",slug:"speaker",name:"Zara",role:"Presenter",company:"Fixture",photo:"/images/sample-avatar-blue.svg",talkTitle:"Test talk",bio:"Test bio",sample:false,category:["Industry"],events:["session"],links:{}};
const event:EventRecord={id:"session",slug:"session",title:"Test session",date:"2025-01-01T09:00:00Z",category:"talk",status:"past",cover:"/images/community-study.svg",summary:"Fixture",tags:[],sample:false,description:"Test description",location:"Test venue",mode:"online",agenda:[],speakers:[],gallery:[]};
test("speaker categories normalize and expose the complete filter set",()=>{
 assert.deepEqual(speakerCategory(["Industry", "Panelists"]),["industry","panelist"]);
 assert.deepEqual(speakerCategory("Student Speakers"),["student"]);
 assert.deepEqual(speakerCategory("Guest contributor"),["other"]);
 assert.deepEqual(availableSpeakerFilters([]).map(item=>item.value),["all","industry","student","other","panelist","judge"]);
 assert.deepEqual(
   availableSpeakerFilters([{...speaker,category:["Alumni"]}]).at(-1),
   {value:"alumni",label:"Alumni"},
 );
});
test("speaker filtering sorts names without mutating records",()=>{
 const input=[speaker,{...speaker,id:"amy",slug:"amy",name:"Amy",category:["Other Speakers"]}];
 assert.deepEqual(filterSpeakers(input,"all").map(person=>person.name),["Amy","Zara"]);assert.equal(input[0].name,"Zara");
 assert.deepEqual(filterSpeakers(input,"industry").map(person=>person.name),["Zara"]);assert.deepEqual(filterSpeakers(input,"judge"),[]);
});
test("speaker/session relationships resolve either side while separating samples and excluding empty or upcoming groups",()=>{
 const fromEvent={...event,id:"other",slug:"other",speakers:[speaker.slug],date:"2026-01-01T09:00:00Z"};
 assert.deepEqual(speakerEvents(speaker,[event,fromEvent,{...event,id:"sample",sample:true}]).map(item=>item.id),["other","session"]);
 assert.equal(speakerEvents({...speaker,sample:true},[event]).length,0);
 const groups=pastSpeakerGroups([speaker],[event,fromEvent,{...event,id:"future",status:"upcoming"},{...event,id:"empty",slug:"empty"}]);
 assert.deepEqual(groups.map(group=>group.event.id),["other","session"]);assert.equal(groups[0].speakers[0].slug,speaker.slug);
 assert.deepEqual(pastSpeakerGroups([],[]),[]);
});
