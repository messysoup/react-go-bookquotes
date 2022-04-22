// FIXME: Rendered with dangerouslysethtml currently.  XSS shouldn't be an issue
// as it is sanitized using DOMPurify directly before rendering.
const italicized = (q) => {
    let result = "";
    let currentlyItalicized = false;

    for (const e of q) {
        if (e === "_" && currentlyItalicized === false) {
            result = result + "<i>"
            currentlyItalicized = true
        } else if (e === "_" && currentlyItalicized) {
            result = result + "</i>"
            currentlyItalicized = false
        } else {
            result = result + e
        }
    }

    return result
}

export default italicized;
