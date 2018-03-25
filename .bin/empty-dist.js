const fs = require("fs-extra");
const chalk = require("chalk");
const path = require("path");

let emptyDist = async () => {
    const distDir = path.join(__dirname, "../dist");
    await fs.emptyDir(distDir);
    /* console.log(chalk.greenBright("Build directory successfully cleared!")); */
}

emptyDist();