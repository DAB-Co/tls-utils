const path = require("path");
const fs = require("fs");
const run_command = require(path.join(__dirname, "run_command.js"));

async function generate_new_client(ca_certificate_path, ca_key_path) {
    const cert_dir = path.join(__dirname, "client");

    try {
        await run_command(`rm -rf \"${cert_dir}\"`);
    } catch (e) {
        if (e.code !== 2) {
            throw e;
        }
    }

    const inp_path = path.join(cert_dir, "inp.txt");

    await run_command(`mkdir -p \"${cert_dir}\"`);
    fs.writeFileSync(inp_path, ".\n.\n.\nDab Co.\n.\n.\n.\n.\n.\n");
    await run_command(`cd \"${cert_dir}\" && 
    openssl genrsa -out client.key 4096 && 
    openssl req -out client.csr -key client.key -new  < \"${inp_path}\" && 
    openssl x509 -req -in client.csr -CA \"${ca_certificate_path}\" -CAkey \"${ca_key_path}\" -CAcreateserial -out client.crt`);
    let cert = fs.readFileSync(path.join(cert_dir, "client.crt"));
    let key = fs.readFileSync(path.join(cert_dir, "client.key"));
    await run_command(`rm -rf \"${cert_dir}\"`);
    return {
        key: key,
        cert: cert
    }
}

module.exports = generate_new_client;
