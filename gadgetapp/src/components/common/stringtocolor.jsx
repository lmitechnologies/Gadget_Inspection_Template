


export default function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        // Adjust the value to be lighter
        value = Math.floor(value * 0.5 + 128); // ensures the color is lighter
        color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
}
