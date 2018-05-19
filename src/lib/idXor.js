export const idXor = (id1, id2) => {
    const length = Math.min(id1.length, id2.length);
    return [...Array(length).keys()]
        .map(i => id1.charCodeAt(i) ^ id2.charCodeAt(i))
        .join('');
};
