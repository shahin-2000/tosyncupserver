const { spawn } = require('child_process');
const path = require('path');
// Function to get Instagram user details
exports.getInstagramUserDetails = (username) => {
    return new Promise((resolve, reject) => {
        const scriptPath = path.resolve(__dirname, '../python/instagram_user_details.py');
        console.log(scriptPath, " :scriptPath");
        const pythonProcess = spawn('python3', [scriptPath, username]);
        // console.log("pythonProcess: ", pythonProcess)
        let data = '';
        let error = '';

        // Capture stdout
        pythonProcess.stdout.on('data', (chunk) => {
            data += chunk.toString();
            console.log(data, " :data");
        });

        // Capture stderr
        pythonProcess.stderr.on('data', (chunk) => {
            error += chunk.toString();
        });

        // Handle script completion
        pythonProcess.on('close', (code) => {
            if (code === 0) {
                try {
                    const result = JSON.parse(data);
                    resolve(result);
                } catch (err) {
                    reject({ error: 'Invalid JSON output from Python script.' });
                }
            } else {
                reject({ error: error || 'Python script failed with exit code ' + code });
            }
        });
    });
}
