const { parentPort } = require('worker_threads');
const { exec } = require('child_process');

parentPort.on('message', (workerData) => {
    const { binaryPath, outputPath, ilspycmdPath } = workerData;
    const command = `"${ilspycmdPath}" "${binaryPath}" -o "${outputPath}"`;
    exec(command, (error) => {
        if (error) {
            parentPort.postMessage({ success: false, error: error.message });
        } else {
            parentPort.postMessage({ success: true });
        }
    });
});
