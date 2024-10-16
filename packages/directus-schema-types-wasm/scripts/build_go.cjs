const { execSync } = require('node:child_process');
const { cpSync, existsSync } = require('node:fs');
const { join, resolve } = require('node:path');

const modDir = resolve(__dirname, '..');
const outDir = join(modDir, 'lib');

run();
function run() {
    build();
    copyWasmExec();
}

function build() {
    try {
        execSync(`go build -o ${join(outDir, 'main.wasm')} ${join(modDir, 'main_wasm.go')}`, {
            env: {
                ...process.env,
                GOOS: 'js',
                GOARCH: 'wasm',
            },
            stdio: 'inherit',
        });
    } catch (err) {
        console.error('go build:', err);
        process.exit(1);
    }
}

function copyWasmExec() {
    const destPath = join(outDir, 'wasm_exec.js');
    if (existsSync(destPath)) {
        return;
    }
    const goRoot = execSync('go env GOROOT', { encoding: 'utf8' }).trim();
    cpSync(join(goRoot, 'misc/wasm/wasm_exec.js'), destPath);
}
