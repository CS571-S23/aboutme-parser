import fs from 'fs';

let clazz = [];
console.log("Beginning parsing...")
fs.readdirSync('submissions').forEach(submission => {
    
    if(!fs.existsSync(`submissions/${submission}/me.json`)) {
        console.log(`${submission}: me.json DNE!`)
    } else {
        const contents = fs.readFileSync(`submissions/${submission}/me.json`);
        try {
            const json = JSON.parse(contents);
            if( isnu(json.name) ||
                isnu(json.name.first) ||
                isnu(json.name.last) ||
                isnu(json.fromWisconsin) ||
                isnu(json.numCredits) ||
                isnu(json.major) ||
                isnu(json.interests)
            ) {
                console.log(`${submission}: Missing required key!`);
            } else if (Object.keys(json).length !== 5){
                console.log(`${submission}: Too many keys!`);
            } else if (Object.keys(json.name).length !== 2) {
                console.log(`${submission}: Too many keys in name!`);
            } else if (!(typeof json.name === 'object' &&
                         typeof json.name.first === 'string' &&
                         typeof json.name.last === 'string' &&
                         typeof json.fromWisconsin === 'boolean' &&
                         typeof json.numCredits === 'number' &&
                         typeof json.interests === 'object' &&
                         Array.isArray(json.interests) &&
                         json.interests.every(interest => typeof interest === 'string')
            )) {
                console.log(`${submission}: Invalid typing!`);
            } else {
                console.log(`${submission} is valid!`)
                clazz.push(json);
            }
        } catch (e) {
            console.log(`${submission}: Not valid JSON!`);
        }
    }
});
console.log("Parsing complete!");

console.log(`Writing clazz with ${clazz.length} students...`);
fs.writeFileSync('clazz.json', JSON.stringify(clazz, null, 2));

function isnu(o) {
    return o === null || o === undefined;
}