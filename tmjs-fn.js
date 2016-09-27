/*
 * Copyright (c) 2016, Team Mion
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

/**
 * TM.js FN (tmjs-fn) ${version}
 * @author Stefan Wimmer <stefanwimmer128@gmail.com>
 */

if (typeof require === "function")
    require("tmjs-core");

tmjs.__defineGetter__("fn", () => "1.0.0-alpha.1");

Object.assign(tmjs, {
    get: (array, n) =>
        n >= 0
        ? array[n]
        : array[array.length + n],
    
    invert: fn =>
        (...args) =>
            ! fn(...args),
    
    each: fn =>
        array =>
            array.forEach(fn),
    
    map: fn =>
        array =>
            array.map(fn),
    
    filter: fn =>
        array =>
            array.filter(fn),
    
    find: fn =>
        array =>
            array.find(fn),
    
    reject: fn =>
        array =>
            array.filter(tmjs.invert(fn)),
    
    reduce: (fn, start0) =>
        (array, start1 = start0) =>
            array.reduce(fn, start1),
    
    some: fn =>
        array =>
            array.some(fn),
    
    every: fn =>
        array =>
            array.every(fn),
    
    sort: fn =>
        array =>
            array.sort(fn),
    
    mapKey: (a, b) =>
        typeof b === "undefined"
        ? b => b.map(x => x[a])
        : a.map(x => x[b]),
    
    sum: (...args) =>
        args.reduce((sum, x) =>
            Array.isArray(x)
            ? sum + tmjs.sum(...x)
            : sum + x
        ),
    
    curry: (fn, n) =>
        (arg, args = []) =>
        {
            args.push(arg);
            
            return args.length === (n || fn.length)
                ? fn(...args)
                : arg => $fn.curry(fn, n)(arg, args);
        },
    
    uncurry: fn =>
        (...args) =>
        {
            let val = fn;
            
            for (const arg of args)
                val = val(arg);
            
            return val;
        },
});
