import { ensureFunction } from "@xso/utils";

const events = {};
const stores = {};

function trigger(key) {
  const store = [];
  for (let i = 1; i < arguments.length; i++) {
    store.push(arguments[i]);
  }
  stores[key] = store;
  for (const event of events[key]) {
    event.apply(null, store.length > 0 ? store : null);
  }
}

trigger.get = (key, event) => {
  ensureFunction(`trigger.get: ${key} < ${event}`, event);
  const store = stores[key];
  event.apply(null, store && store.length > 0 ? store : null);
}

trigger.set = (key, event) => {
  ensureFunction(`trigger.set: ${key} < ${event}`, event);
  events[key] = [ event ];
}

trigger.add = (key, event) => {
  ensureFunction(`trigger.add: ${key} < ${event}`, event);
  if (!events[key]) {
    trigger.clear(key);
  }
  events[key].push(event);
}

trigger.del = (key, event) => {
  ensureFunction(`trigger.del: ${key} < ${event}`, event);
  events[key] = events[key].filter((item) => item !== event);
}

trigger.events = (key) => {
  if (!events[key]) {
    trigger.clear(key);
  }
  return [...events[key]];
}

trigger.stored = (key) => {
  if (!stores[key]) {
    trigger.clear(key);
  }
  return [...stores[key]];
}

trigger.exists = (key) => {
  return events[key] && stores[key] ? true : false;
}

trigger.clear = (key) => {
  events[key] = [ ];
  stores[key] = [ ];
}

trigger.purge = (key) => {
  delete events[key];
  delete stores[key];
}

export default trigger;
