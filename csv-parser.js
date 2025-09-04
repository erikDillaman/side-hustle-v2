/**
 * Generic CSV Parser Helper Script
 * This script provides an async function to parse any CSV file and create object arrays
 * Students can use this with any CSV structure - headers become object properties
 */

/**
 * Async function to create an object array from any CSV file
 * This function handles all the complexity of file loading and parsing
 * Works with any CSV structure - headers become object properties
 * 
 * @param {string} filename - The name of the CSV file to load (e.g., 'my-data.csv')
 * @returns {Promise<Array>} - Promise that resolves to an array of objects
 */
async function createHustleArray(filename) {
    try {
        console.log(`Loading data from ${filename}...`);
        
        // Fetch the CSV file
        const response = await fetch(filename);
        
        if (!response.ok) {
            throw new Error(`Failed to load CSV file: ${response.status} ${response.statusText}`);
        }
        
        // Get the CSV content as text
        const csvData = await response.text();
        
        // Parse the CSV data
        const objectArray = parseCSVData(csvData);
        
        console.log(`Successfully loaded ${objectArray.length} objects from ${filename}`);
        return objectArray;
        
    } catch (error) {
        console.error('Error loading CSV file:', error.message);
        
        // Provide helpful error messages for students
        if (error.message.includes('Failed to fetch')) {
            console.log(' Tip: Make sure the CSV file is in the same folder as your HTML file');
            console.log(' Tip: If testing locally, you may need to run a local server (like Live Server extension)');
        }
        
        return []; // Return empty array on error
    }
}

/**
 * Helper function to automatically detect if a value should be a number
 * @param {string} value - The string value to check
 * @returns {number|string} - Returns number if it's numeric, otherwise returns original string
 */
function autoConvertValue(value) {
    // Remove any whitespace
    const trimmed = value.trim();
    
    // Check if it's empty
    if (trimmed === '') {
        return '';
    }
    
    // Check if it's a number (including decimals and negative numbers)
    const numberPattern = /^-?\d*\.?\d+$/;
    if (numberPattern.test(trimmed)) {
        const numValue = parseFloat(trimmed);
        if (!isNaN(numValue)) {
            return numValue;
        }
    }
    
    // Check for boolean-like values
    const lowerValue = trimmed.toLowerCase();
    if (lowerValue === 'true') return true;
    if (lowerValue === 'false') return false;
    
    // Return as string if not a number or boolean
    return trimmed;
}

/**
 * Helper function to clean up header names to be valid JavaScript property names
 * @param {string} header - The raw header from CSV
 * @returns {string} - Clean property name
 */
function cleanHeaderName(header) {
    return header
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_')  // Replace spaces with underscores
        .replace(/[^a-z0-9_]/g, '')  // Remove special characters
        .replace(/^_+|_+$/g, '')  // Remove leading/trailing underscores
        .replace(/_+/g, '_');  // Replace multiple underscores with single
}

/**
 * Generic helper function to parse CSV data into objects
 * This function uses loops and string manipulation that students don't need to understand
 * Works with any CSV structure - automatically detects data types
 * 
 * @param {string} csvData - The raw CSV text data
 * @returns {Array} - Array of objects with properties based on CSV headers
 */
function parseCSVData(csvData) {
    const objectArray = [];
    
    // Split CSV into lines and remove any empty lines
    const lines = csvData.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length === 0) {
        console.warn('CSV file appears to be empty');
        return objectArray;
    }
    
    if (lines.length === 1) {
        console.warn('CSV file only contains headers, no data rows');
        return objectArray;
    }
    
    // Get headers from first line and clean them up
    const rawHeaders = lines[0].split(',').map(header => header.trim());
    const headers = rawHeaders.map(header => cleanHeaderName(header));
    
    console.log(`Found ${headers.length} columns:`, headers);
    
    // Loop through each data line (skip header at index 0)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (line === '') {
            continue;
        }
        
        // Split the line into values and clean them up
        const values = line.split(',').map(value => value.trim());
        
        // Handle rows with different number of columns
        if (values.length !== headers.length) {
            console.warn(`Row ${i + 1} has ${values.length} values but expected ${headers.length}. Padding or truncating as needed.`);
            
            // Pad with empty strings if too few values
            while (values.length < headers.length) {
                values.push('');
            }
            
            // Truncate if too many values
            if (values.length > headers.length) {
                values.length = headers.length;
            }
        }
        
        // Create object using headers as property names
        const dataObject = {};
        
        // Loop through headers to create object properties
        for (let j = 0; j < headers.length; j++) {
            const header = headers[j];
            const rawValue = values[j];
            
            // Auto-convert the value to appropriate type
            dataObject[header] = autoConvertValue(rawValue);
        }
        
        // Add to object array
        objectArray.push(dataObject);
    }
    
    return objectArray;
}

/**
 * Alternative function for students who want to use embedded CSV data
 * This avoids CORS issues entirely by using data stored in the JavaScript
 * 
 * @param {string} csvData - The CSV data as a string
 * @returns {Array} - Array of objects
 */
function createHustleArrayFromData(csvData) {
    console.log('Creating object array from embedded data...');
    const objectArray = parseCSVData(csvData);
    console.log(`Successfully created array with ${objectArray.length} objects`);
    return objectArray;
}

/**
 * Generic utility function to validate that an object has properties
 * Students can use this to check if their data loaded correctly
 * 
 * @param {Object} obj - An object to validate
 * @param {Array} requiredProperties - Array of property names that should exist (optional)
 * @returns {boolean} - True if the object has the required properties
 */
function validateObject(obj, requiredProperties = []) {
    if (!obj || typeof obj !== 'object') {
        console.warn('Invalid object provided for validation');
        return false;
    }
    
    // If no required properties specified, just check that object has some properties
    if (requiredProperties.length === 0) {
        const keys = Object.keys(obj);
        if (keys.length === 0) {
            console.warn('Object has no properties');
            return false;
        }
        console.log(`Object has ${keys.length} properties:`, keys);
        return true;
    }
    
    // Check for specific required properties
    for (const prop of requiredProperties) {
        if (!(prop in obj)) {
            console.warn(`Object missing required property: ${prop}`);
            return false;
        }
    }
    
    return true;
}

/**
 * Utility function to analyze the structure of loaded data
 * Helps students understand what properties their objects have
 * 
 * @param {Array} dataArray - Array of objects to analyze
 * @returns {Object} - Analysis results
 */
function analyzeDataStructure(dataArray) {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
        console.log('No data to analyze');
        return { properties: [], types: {}, sampleCount: 0 };
    }
    
    const firstObject = dataArray[0];
    const properties = Object.keys(firstObject);
    const types = {};
    
    // Analyze data types for each property
    properties.forEach(prop => {
        const sampleValues = dataArray.slice(0, Math.min(5, dataArray.length)).map(obj => obj[prop]);
        const valueTypes = sampleValues.map(val => typeof val);
        const mostCommonType = valueTypes.reduce((a, b, i, arr) => 
            arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
        );
        types[prop] = mostCommonType;
    });
    
    console.log(` Data Analysis:`);
    console.log(`   Objects: ${dataArray.length}`);
    console.log(`   Properties: ${properties.length}`);
    properties.forEach(prop => {
        console.log(`   - ${prop}: ${types[prop]}`);
    });
    
    return {
        properties,
        types,
        sampleCount: dataArray.length
    };
}

// Export functions for use in other scripts (if using modules)
// For simple HTML projects, these functions are available globally
