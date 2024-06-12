function l(r, t, n, a) {
  if (l.null == t)
    throw new Error(`${n} is null and not a valid ${r}.`);
  if (l.invalid == t)
    throw new Error(`${n} is ${typeof a} and not a valid ${r}.`);
}
l.array = "array";
l.function = "function";
l.object = "object";
l.string = "string";
l.null = 0;
l.invalid = 1;
function s(r, t) {
  t == null && l(l.function, l.null, r, t), typeof t != "function" && l(l.function, l.invalid, r, t);
}
const o = {}, u = {};
function i(r) {
  const t = [];
  for (let n = 1; n < arguments.length; n++)
    t.push(arguments[n]);
  u[r] = t;
  for (const n of o[r])
    n.apply(null, t.length > 0 ? t : null);
}
i.get = (r, t) => {
  s(`trigger.get: ${r} < ${t}`, t);
  const n = u[r];
  t.apply(null, n && n.length > 0 ? n : null);
};
i.set = (r, t) => {
  s(`trigger.set: ${r} < ${t}`, t), o[r] = [t];
};
i.add = (r, t) => {
  s(`trigger.add: ${r} < ${t}`, t), o[r] || i.clear(r), o[r].push(t);
};
i.del = (r, t) => {
  s(`trigger.del: ${r} < ${t}`, t), o[r] = o[r].filter((n) => n !== t);
};
i.events = (r) => (o[r] || i.clear(r), [...o[r]]);
i.stored = (r) => (u[r] || i.clear(r), [...u[r]]);
i.exists = (r) => !!(o[r] && u[r]);
i.clear = (r) => {
  o[r] = [], u[r] = [];
};
i.purge = (r) => {
  delete o[r], delete u[r];
};
export {
  i as default
};
