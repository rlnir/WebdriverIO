import fs from 'fs';

class FileServices {
    write(input: string, file = "results.txt"): void {
        const text = `${input} `;

        const dir = "./results";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        fs.appendFile(`${dir}/${file}`, text, (err) => {
            if (err) throw err;
        });
    }
}

export default new FileServices();