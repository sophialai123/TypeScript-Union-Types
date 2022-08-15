"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const courses_1 = __importDefault(require("./courses"));
const studyGroups_1 = __importDefault(require("./studyGroups"));
//Searching Through Events
//we’ll call courses and study groups “events” when referring to both.
function searchEvents(options) {
    //events will have either a value of course or studyGroup
    const events = options.eventType === "courses" ? courses_1.default : studyGroups_1.default;
    //return the result
    return events.filter((event) => {
        //conditional with a type guard that checks
        if (typeof options.query === "number") {
            return options.query === event.id;
        }
        //Another great way to search through courses and study groups 
        //is by by keyword.includes() method on arrays.
        if (typeof options.query === "string") {
            return event.keywords.includes(options.query);
        }
    });
}
let searchResults = searchEvents({ query: "art", eventType: "groups" });
//console.log(searchResults);
//Enrolling in Events
let enrolledEvents = [];
function enroll(event) {
    //add the passed event to the enrolledEvents array.
    enrolledEvents = [...enrolledEvents, event];
}

//taking course
enroll(searchResults[0]);
console.log(enrolledEvents);
