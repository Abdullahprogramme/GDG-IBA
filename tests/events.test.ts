import assert from "node:assert/strict";
import { test } from "node:test";
import { filterEvents, readEventFilters, nextUpcoming, countdownParts, eventPhotos, eventAction, eventYear, eventTime, type EventRecord } from "../src/lib/events.ts";
const base:EventRecord={id:"a",slug:"a",title:"Build a web app",date:"2027-01-01T09:00:00Z",category:"workshop",status:"upcoming",cover:"/images/community-study.svg",summary:"Build together",tags:["Web"],sample:false,description:"Hands-on session",location:"Karachi",mode:"onsite",agenda:[],speakers:[],gallery:[]};
const events=[base,{...base,id:"b",slug:"b",title:"Cloud talk",date:"2025-01-01T09:00:00Z",category:"talk",status:"past" as const,tags:["Cloud"]}];
test("event filters combine topic/status, case-insensitive search and Pakistan year without mutating data",()=>{
 assert.deepEqual(filterEvents(events,{tab:"workshop",query:"WEB",year:"2027"}).map(e=>e.id),["a"]);
 assert.deepEqual(filterEvents(events,{tab:"past",query:"cloud",year:"2025"}).map(e=>e.id),["b"]);
 assert.deepEqual(filterEvents(events,{tab:"all",query:"missing",year:"all"}),[]);
 assert.deepEqual(filterEvents(events,{tab:"all",query:"",year:"all"}).map(e=>e.id),["a","b"]);
 assert.equal(events[0],base);assert.equal(eventYear("2026-12-31T22:00:00Z"),"2027");
 assert.equal(eventTime(base.date),"14:00");
 assert.deepEqual(readEventFilters("?category=study-jam&q=hello&year=2026"),{tab:"study-jam",query:"hello",year:"2026"});
 assert.deepEqual(readEventFilters("?category=bad&year=wat"),{tab:"all",query:"",year:"all"});
 assert.equal(readEventFilters("?status=past").tab,"past");
});
test("next event excludes samples and expired sessions, and selects the nearest future date",()=>{
 const soon={...base,id:"soon",date:"2026-12-01T09:00:00Z"};
 assert.equal(nextUpcoming([{...base,sample:true},base,soon],Date.parse("2026-10-09"))?.id,"soon");
 assert.equal(nextUpcoming([{...base,sample:true}],0),undefined);
 assert.equal(nextUpcoming(events,Date.parse("2028-01-01")),undefined);
});
test("countdown handles unit boundaries, expiration and invalid dates",()=>{
 assert.deepEqual(countdownParts("2027-01-02T01:02:03Z",Date.parse("2027-01-01T00:00:00Z")),{days:1,hours:1,minutes:2,seconds:3,finished:false});
 assert.deepEqual(countdownParts(base.date,Date.parse(base.date)),{days:0,hours:0,minutes:0,seconds:0,finished:true});
 assert.equal(countdownParts("invalid",0),null);
});
test("event actions reject samples and unsafe URLs, and distinguish registration from recaps",()=>{
 assert.equal(eventAction({...base,sample:true,registerUrl:"https://example.com/join"}),undefined);
 assert.equal(eventAction({...base,registerUrl:"javascript:alert(1)"}),undefined);
 assert.deepEqual(eventAction({...base,registerUrl:"https://example.com/join"}),{href:"https://example.com/join",label:"Register"});
 assert.deepEqual(eventAction({...base,status:"past",recapUrl:"https://example.com/recap"}),{href:"https://example.com/recap",label:"Read recap"});
});
test("recap photos belong to the selected event, deduplicate cover sources and exclude mismatched samples",()=>{
 const photo={id:"p",event:"a",src:"/images/community-study.svg",alt:"Fixture",width:800,height:600,sample:false};
 const result=eventPhotos({...base,gallery:[photo.src,"/images/sample-cloud.svg"]},[photo,{...photo,id:"other",event:"b"},{...photo,id:"sample",sample:true}]);
 assert.equal(result.length,2);assert.equal(result[0].id,"p");assert.deepEqual(eventPhotos(undefined,[photo]),[]);
});
