const fs = require('fs');
const path = require('path');

// Adjust the target directory to one level above
const targetDirectory = path.resolve(__dirname, '.');
const metadataDirectory = path.resolve(__dirname, 'metadata');

// Ensure the metadata directory exists
if (!fs.existsSync(metadataDirectory)) {
    fs.mkdirSync(metadataDirectory);
}

const sitemapFilePath = path.resolve(metadataDirectory, 'sitemap.md');
const outputFilePath = path.resolve(metadataDirectory, 'filteredContent.json');

// Folders to exclude from the folder structure mapping
const excludedFolders = new Set([
    '.git',
    '.next',
    '.contentlayer',
    '.github',
    '.husky',
    '.vscode',
    '.yarn',
    'node_modules',
    'api/studio/.sanity',
    'api/studio/dist',
]);

function getFolderStructure(dir, currentPath = '') {
    const result = {};
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
            if (!excludedFolders.has(item)) {
                const newPath = path.join(currentPath, item);
                result[item] = getFolderStructure(itemPath, newPath);
            }
        } else {
            result[item] = path.join(currentPath, item);
        }
    });

    return result;
}

function convertToMarkdown(structure, indent = '') {
    let markdown = '';

    for (const key in structure) {
        if (typeof structure[key] === 'object') {
            markdown += `${indent}- ${key}\n`;
            markdown += convertToMarkdown(structure[key], `${indent}  `);
        } else {
            markdown += `${indent}  - ${structure[key]}\n`;
        }
    }

    return markdown;
}

function readFileAsJson(filePath, relativePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8').trim();
        if (content) {
            return { path: relativePath, content };
        }
    } catch (error) {
        console.error(`Error reading file: ${filePath}`, error);
    }
    return null;
}

function processSitemapToJson(sitemapPath, outputPath) {
    try {
        const excludedFiles = [
            'package-lock.json',
            'README.md',
            '.gitignore',
            '.env',
            'getFolderStructure.js',
            'next-env.d.ts',
            'next.config.ts',
            'sitemap.md',
            'src/app/favicon.ico',
            'studio/eslint.config.mjs',
            'studio/package.json',
            'studio/static/.gitkeep',
            'studio/tsconfig.json',
            'studio/sanity.cli.ts',
            'filteredContent.json'
        ];
        const excludedExtensions = ['.jpeg', '.jpg', '.png', '.svg', '.gif', '.ico', '.md'];
        const excludedPaths = [
            '.sanity/',
            'studio/.sanity/runtime/',
            'z-utils/'
        ];

        const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
        const lines = sitemap.split('\n');
        const combinedContent = [];

        lines.forEach((line) => {
            const match = line.trim().match(/-\s*(.*)/);
            if (match) {
                const relativePath = match[1].trim();
                const fullPath = path.resolve(targetDirectory, relativePath);

                if (
                    fs.existsSync(fullPath) &&
                    fs.lstatSync(fullPath).isFile() &&
                    !excludedFiles.includes(path.basename(relativePath)) &&
                    !excludedExtensions.includes(path.extname(relativePath)) &&
                    !excludedPaths.some((excludedPath) => relativePath.startsWith(excludedPath))
                ) {
                    const fileData = readFileAsJson(fullPath, relativePath);
                    if (fileData) {
                        combinedContent.push(fileData);
                    }
                }
            }
        });

        const timestamp = new Date().toISOString();
        const outputData = { timestamp, files: combinedContent };

        fs.writeFileSync(outputPath, JSON.stringify(outputData, null, 2), 'utf-8');
        console.log(`Filtered JSON content has been saved to ${outputPath}`);
    } catch (error) {
        console.error(`Error processing sitemap: ${sitemapPath}`, error);
    }
}

// Generate the folder structure and save it as a sitemap
const folderStructure = getFolderStructure(targetDirectory);
const markdownOutput = convertToMarkdown(folderStructure);
fs.writeFileSync(sitemapFilePath, markdownOutput, 'utf-8');
console.log('Sitemap has been saved to sitemap.md');

// Process the sitemap to generate the filtered JSON
processSitemapToJson(sitemapFilePath, outputFilePath);
