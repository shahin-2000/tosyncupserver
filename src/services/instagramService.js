const { exec } = require('child_process');
const path = require('path');

exports.getInstagramUserDetails = async (username) => {
    const scriptPath = path.join(__dirname, '../python/instagram_user_details.py');

    return new Promise((resolve, reject) => {
        exec(`python3 ${scriptPath} ${username}`, (error, stdout, stderr) => {
            if (error) {
                return reject(new Error(`Error executing Python script: ${stderr || error.message}`));
            }

            try {
                const result = JSON.parse(stdout);
                if (result.error) {
                    return reject(new Error(result.error));
                }
                resolve(result);
            } catch (parseError) {
                reject(new Error('Failed to parse Python script output.'));
            }
        });
    });
};
