import { readFileSync } from 'fs';

export function csvToJson(filePath:string) {

    const csv = readFileSync(filePath)
    const array = csv.toString().split("\n");
    
    let result = [];
    let headers = array.shift().split(";")
    array.pop()

    array.forEach((_item) => {
        const obj = {}
        const row = _item.split(";")

        headers.forEach((item, idx) => {
            obj[item] = row[idx]
        });
        result.push(obj)
    })
    return result;
}
