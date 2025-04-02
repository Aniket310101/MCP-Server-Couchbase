#!/usr/bin/env node

const path = require("path");
const fs = require("fs");

// Check for config file
const configFile = process.argv[2];
if (configFile) {
  try {
    const config = JSON.parse(fs.readFileSync(configFile, "utf8"));
    
    // Handle nested configuration structure
    for (const [serverType, serverConfigs] of Object.entries(config.mcpServers)) {
      for (const [key, value] of Object.entries((serverConfigs as any).env)) {
        process.env[key] = value as string;
      }
    }
  } catch (error: any) {
    console.error(`Error reading config file: ${error.message}`);
    process.exit(1);
  }
}

// Run the server
require("../index.js");