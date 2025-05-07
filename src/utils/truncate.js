// src/utils/truncate.js
export default function (text, length) {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "..." : text;
}
