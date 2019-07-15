/**
 * Check if String is null return true if not empty
 * @param {String} condition 
 */
export function isNull(condition) {
    return condition !== null ? true : false
}

/**
 * Check if String is over the max lenght return true if over
 * @param {String} condition 
 * @param {Int} max 
 */
export function isLength(param, max) {
    return param !== null && param.length >= max ? true : false
}

/**
 * Check the formatting of email
 * @param {String} param 
 */
export function isEmail(param) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
    return reg.test(param) === false ? true : false
}

/**
 * Convert Int or String to IDR format
 * @param {Int} value 
 */
export const idr = (value) => {
    if (value) return "Rp. " + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");    
}