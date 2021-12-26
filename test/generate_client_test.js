const path = require("path");
const fs = require("fs");
const run_command = require(path.join(__dirname, "..", "run_command.js"));
const generate_client = require(path.join(__dirname, "..", "generate_client.js"));

async function run() {
    const ca_dir = path.join(__dirname, "..", "certs", "ca");
    if (!fs.existsSync(ca_dir)) {
        const inp_path = path.join(__dirname, "inp.txt");
        fs.writeFileSync(inp_path, ".\n.\n.\nDab Co.\n.\n.\n.\n");
        await run_command(`mkdir -p \"${ca_dir}\"`);
        await run_command(`cd \"${ca_dir}\" && 
        openssl req -new -x509 -nodes -extensions v3_ca -keyout ca.key -out ca.crt < \"${inp_path}\"`);
        await run_command(`rm \"${inp_path}\"`);
    }

    let result = await generate_client(path.join(ca_dir, "ca.crt"), path.join(ca_dir, "ca.key"));
    fs.writeFileSync("client_key.txt", result.key, "utf-8");
    fs.writeFileSync("client_cert.txt", result.cert, "utf-8");
}

run().then();
