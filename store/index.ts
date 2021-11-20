import { Context } from "@nuxt/types";
import { Event, Tags } from "../Types"
interface State {
  list: string[],
  currentTimelineName: string,
  settings: {
    yearWidth: number
  },
  filter: string[]
  eventsString: string | null,
  timelinePath: string | null,
  username: string | null
}
export const COLORS = ["green", "blue", "red", "yellow", "indigo", "purple", "pink"];

let currentTimelineName = ''
let list = [] as string[]

const exampleTimeline = `// Comments start with two slashes: \`//\`
// Tags start with a pound sign: \`@\`

// You can color tags
@Work: pink
@Education: #111

{08/2008-05/2012: Psych degree : @Education :  
<markdown>
# Hello
What's going on here?

## Bye
* some bullet points
* another
* another
</markdown>}

{02/2010-06/2012: Dispatcher : @Work}

// 2015
{05/2015-08/2015: Summer classes so I can graduate in two years : @Education}
{05/2015: James graduation}
{06/2015: Built desk}
{06/2015: Kim and Matt wedding}
{08/2015-05/2017: CS degree : @Education}

// 2016
{05/22/2016-08/12/2016: Cardinal Health : @Work}
{08/16/2016-08/27/2016: Italy}`

const eventsString = currentTimelineName ? localStorage.getItem(currentTimelineName) : exampleTimeline

export const state = () => ({
  list: list,
  currentTimelineName: currentTimelineName,
  settings: {
    yearWidth: 120
  },
  filter: [],
  eventsString: eventsString,
  timelinePath: '',
  username: ''
})

export const mutations = {
  setUsername(state: State, username: string) {
    state.username = username
  },
  setTimelinePath(state: State, path: string) {
    state.timelinePath = path
  },
  getLocalTimelines(state: State) {
    if (!process.browser || state.timelinePath) {
      return
    }
    const concatenatedList = window && window.localStorage && window.localStorage.getItem("timelines")
    state.list = concatenatedList ? concatenatedList.split(',') : []
    state.currentTimelineName = state.list.length > 0 ? state.list[0] : ''
    state.eventsString = state.currentTimelineName ? localStorage.getItem(state.currentTimelineName) : exampleTimeline
  },
  setCurrentTimeline(state: State, timelineName: string) {
    state.eventsString = localStorage.getItem(timelineName) ?? ""
    state.currentTimelineName = timelineName
  },
  removeTimeline(state: State, timelineName: string) {
    localStorage.removeItem(timelineName);
    state.list.splice(state.list.indexOf(timelineName), 1);
    localStorage.setItem("timelines", state.list.join(","));
    if (state.currentTimelineName === timelineName && state.list.length > 0) {
      const nextTimeline = state.list[0]
      state.eventsString = localStorage.getItem(nextTimeline) || ""
    } else {
      state.eventsString = ""
    }
  },
  saveTimeline(state: State, timelineName: string) {
    localStorage.setItem(timelineName, state.eventsString || "");
    if (!state.list.includes(timelineName)) {
      state.list.push(timelineName)
      localStorage.setItem("timelines", state.list.join(","));
    }
  },
  setYearWidth(state: State, width: number) {
    state.settings.yearWidth = Math.max(10, Math.min(1600, width))
  },
  setEventsString(state: State, str: string) {
    state.eventsString = str
  },
  clearFilters(state: State) {
    state.filter = []
  },
  filterTag(state: State, tag: string) {
    const index = state.filter.indexOf(tag)
    if (index >= 0) {
      state.filter.splice(index, 1)
    } else {
      state.filter.push(tag)
    }
  }
}

export const getters = {
  trimmedAndFilteredEntries(state: State): string[][] {
    if (!state.eventsString) {
      return []
    }
    // Gets markdown
    let markdowns: string[] = state.eventsString.match(/(?<=\<markdown\>).*?(?=\<\/markdown\>)/gms) ?? [];
    let eventStrings = state.eventsString.replace(/\<markdown\>.*?\<\/markdown\>/gms, "") ?? "" 
    let eventMatches = eventStrings?.match(/(?<=^\{).*?(?=\})/gms) ?? [] 
    let eventTokens: string[][] = eventMatches?.map(es => es.trim().split(":").map(e => e.trim()))
    eventTokens?.filter(es => es.length > 2).forEach((es, i) => es[3] = markdowns[i])

    // Filter empty strings, comments, and malformatted lines
    const filter = function (eventString: string): boolean {
      // if (!eventString) {
      //   return false
      // }
      // if (eventString.match(/^\s*\/\/.*/)) {
      //   return false
      // }
      return true
    }
    
    // return eventStrings.filter(filter).map((str: string) => str.trim());
    return eventTokens
  },
  events(state: State, getters: any): Event[] {
    return getters.trimmedAndFilteredEntries
      .filter((str: string[]) => str.join("").match(/(?:^\d|^now)/))
      .map((e: string[]) => e.join(":"))
      .map(Event.fromString).filter((event: Event | null) => !!event)
  },
  filteredEvents(state: State, getters: any): Event[] {
    return (getters.events as Event[])
      .filter(event =>
        state.filter.length === 0 ||
        event.event.tags.some(tag =>
          state.filter.includes(tag)))
  },
  tags(state: State, getters: any): Tags {
    let paletteIndex = 0
    const keys: Set<string> = new Set(getters.events.flatMap((event: Event) => event.event.tags))

    if (!state.eventsString) {
      return {}
    }

    let eventStrings = state.eventsString.replace(/\<markdown\>.*?\<\/markdown\>/gms, "") ?? "" 
    let eventMatches = eventStrings.replace(/^\{.*?\}/gms, "")

    const coloredTags = eventMatches.split("\n")
      .filter((str: string) => str.startsWith("@"))
      .map((str: string) => str.substring(1).split(": "))

    const tags = {} as { [tagName: string]: string }
    for (let tag of coloredTags) {
      tags[tag[0]] = tag[1]
    }

    for (let tag of keys) {
      if (!tags[tag]) {
        tags[tag] = COLORS[paletteIndex++ % COLORS.length]
      }
    }
    return tags
  },
}

export const actions = {
  nuxtServerInit(store: any, context: Context) {
    if (context.req.timelineFile) {
      store.commit('setEventsString', context.req.timelineFile)
    }
    if (context.req.timelinePath) {
      store.commit('setTimelinePath', context.req.timelinePath)
    }
  }
}
