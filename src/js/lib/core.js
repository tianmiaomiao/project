/**
 * Created by tianmiao on 2018/7/11.
 */
"use strict";
export const noop = (()=>{})

export const getDpr = (()=> {
    const getParam = (name, str) => {
        const reg = new RegExp(`(^|,)${name}=([^,]*)(,|$)`, 'i');
        const r = str.match(reg)
        if (r != null) {
            return r[2]
        }
        return null
    }

    const viewPort = document.querySelector('meta[name=viewport]');

    if (!viewPort) {
        return 1
    }

    const viewPortContent = viewPort.getAttribute('content')
    const initialScale = +(getParam('initial-scale', viewPortContent) || 1);
    const maximumScale = +(getParam('maximum-scale', viewPortContent) || 1);
    const minimumScale = +(getParam('minimum-scale', viewPortContent) || 1);

    return 1 / Math.min(initialScale, maximumScale, minimumScale)
});
export const render = (function(global) {
    const docStyle = document.documentElement.style

    let engine

    if (global.opera && Object.prototype.toString.call(opera) === '[object Opera]') {
        engine = 'presto'
    } else if ('MozAppearance' in docStyle) {
        engine = 'gecko'
    } else if ('WebkitAppearance' in docStyle) {
        engine = 'webkit'
    } else if (typeof navigator.cpuClass === 'string') {
        engine = 'trident'
    }

    const vendorPrefix = {
        trident: 'ms',
        gecko: 'Moz',
        webkit: 'Webkit',
        presto: 'O',
    }[engine]

    const helperElem = document.createElement('div')
    const perspectiveProperty = vendorPrefix + 'Perspective'
    const transformProperty = vendorPrefix + 'Transform'

    if (helperElem.style[perspectiveProperty] !== undefined) {
        return function(content, left, top) {
            // console.log(top)
            content.style[transformProperty] = `translate3d(${-left}px,${-top}px,0)`
        }
    } else if (helperElem.style[transformProperty] !== undefined) {
        return function(content, left, top) {
            content.style[transformProperty] = `translate(${-left}px,${-top}px,0)`
        }
    } else {
        return function(content, left, top) {
            content.style.marginLeft = left ? `${-left}px` : ''
            content.style.marginTop = top ? `${-top}px` : ''
        }
    }
})(window);

export function compareObjects(object0, object1) {
    let ret = true

    if (!object0 || !object1) {
        ret = false
    } else if (typeof object0 !== 'object' || typeof object1 !== 'object') {
        ret = false
    } else if (JSON.stringify(object0) !== JSON.stringify(object1)) {
        ret = false
    }

    return ret
}
export function traverse(data, childrenKeys, fn) {
    if (!data) {
        return
    }
    if (typeof childrenKeys === 'function') {
        fn = childrenKeys
        childrenKeys = []
    }
    let level = 0 // current level
    let indexs = [] // index set of all levels
    const walk = curData => {
        for (let i = 0, len = curData.length; i < len; i++) {
            const isArray = Array.isArray(curData[i])

            const key = Array.isArray(childrenKeys) ? childrenKeys[level] : childrenKeys

            if (isArray || (curData[i] && curData[i][key])) {
                level++
                indexs.push(i)
                walk(isArray ? curData[i] : curData[i][key])
            } else if (level >= childrenKeys.length) {
                const res = fn(curData[i], level, [...indexs, i])
                if (res === 1) {
                    continue
                } else if (res === 2) {
                    break
                }
            } else {
                continue
            }
        }
        level = 0
        indexs = []
    }
    walk(data)
}

const defaultOptions = {
    currentLevel: 0,
    maxLevel: 0,
    values: [],
    defaultIndex: [],
}
/**
 * Merge an Array of Objects into a single Object.
 */
export function toObject(arr) {
    const res = {}
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]) {
            Object.assign(res, arr[i])
        }
    }
    return res
}

/**
 * cascade column by set value of following columns
 * @param {*} picker instance of picker-column
 * @param {*} options { currentLevel, maxLevel, values }
 * @param {*} fn
 */
export function cascadePicker(picker, options, fn) {
    options = {...defaultOptions, ...options}

    /* istanbul ignore if */
    if (!picker) {
        console.log('cascade: picker is undefined');
        return
    }

    let values = options.values;

    /* istanbul ignore next */
    for (let i = options.currentLevel + 1; i < options.maxLevel; i++) {
        const activeIndex = options.defaultIndex[i] || 0;
        const columnValues = values.children || [];
        picker.setColumnValues(i, columnValues);
        values = columnValues[activeIndex] || [];
    }

    fn && fn()
}