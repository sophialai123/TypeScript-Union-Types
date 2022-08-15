import courses from "./courses";
import studyGroups from "./studyGroups";

type Course = {
  id: number,
  studyGroupId: number,
  title: string,
  keywords: string[],
  eventType: string,

}

type StudyGroups = {
  id: number,
  courseId: number,
  title: string,
  keywords: string[],
  eventType: string,
}

type SearchEventsOptions = {
  query: string | number
  eventType: 'courses' | 'groups'
}


//Searching Through Events
//we’ll call courses and study groups “events” when referring to both.
function searchEvents(options: SearchEventsOptions) {

  //events will have either a value of course or studyGroup
  const events: (Course | StudyGroups)[] = options.eventType === "courses" ? courses : studyGroups;


  //return the result
  return events.filter((event: (Course | StudyGroups)) => {
    //conditional with a type guard that checks
    if (typeof options.query === "number") {
      return options.query === event.id;
    }
    //Another great way to search through courses and study groups 
    //is by by keyword.includes() method on arrays.
    if (typeof options.query === "string") {
      return event.keywords.includes(options.query)

    }

  })

}

let searchResults = searchEvents({ query: "art", eventType: "groups" })
//console.log(searchResults);


//Enrolling in Events
let enrolledEvents: (Course | StudyGroups)[] = [];
function enroll(event: (Course | StudyGroups)) {
  //add the passed event to the enrolledEvents array.
  enrolledEvents = [...enrolledEvents, event];


}

enroll(searchResults[0])
console.log(enrolledEvents)




