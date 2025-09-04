/**
 * CSV Parser Helper Script
 * This script provides an async function to parse CSV files and create hustle arrays
 * Students can call this function from their main script to load data from any CSV file
 */

/**
 * Async function to create a hustle array from a CSV file
 * This function handles all the complexity of file loading and parsing
 * Students just need to provide the filename
 * 
 * @param {string} filename - The name of the CSV file to load (e.g., 'side-hustles-v2.csv')
 * @returns {Promise<Array>} - Promise that resolves to an array of hustle objects
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
        const hustleArray = parseCSVData(csvData);
        
        console.log(`Successfully loaded ${hustleArray.length} hustles from ${filename}`);
        return hustleArray;
        
    } catch (error) {
        console.error('Error loading CSV file:', error.message);
        
        // Provide helpful error messages for students
        if (error.message.includes('Failed to fetch')) {
            console.log('💡 Tip: Make sure the CSV file is in the same folder as your HTML file');
            console.log('💡 Tip: If testing locally, you may need to run a local server (like Live Server extension)');
        }
        
        return []; // Return empty array on error
    }
}

/**
 * Helper function to parse CSV data into hustle objects
 * This function uses loops and string manipulation that students don't need to understand
 * 
 * @param {string} csvData - The raw CSV text data
 * @returns {Array} - Array of hustle objects
 */
function parseCSVData(csvData) {
    const hustleArray = [];
    
    // Split CSV into lines and remove any empty lines
    const lines = csvData.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length === 0) {
        console.warn('CSV file appears to be empty');
        return hustleArray;
    }
    
    // Get headers from first line and clean them up
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Loop through each data line (skip header at index 0)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Skip empty lines
        if (line === '') {
            continue;
        }
        
        // Split the line into values and clean them up
        const values = line.split(',').map(value => value.trim());
        
        // Make sure we have the right number of values
        if (values.length !== headers.length) {
            console.warn(`Row ${i + 1} has ${values.length} values but expected ${headers.length}. Skipping row.`);
            continue;
        }
        
        // Create hustle object using headers as property names
        const hustleObject = {};
        
        // Loop through headers to create object properties
        for (let j = 0; j < headers.length; j++) {
            const header = headers[j];
            const value = values[j];
            
            // Convert numeric fields to numbers
            if (header === 'impact_per_hour' || header === 'training_time') {
                const numValue = parseFloat(value);
                if (isNaN(numValue)) {
                    console.warn(`Invalid number "${value}" in ${header} for row ${i + 1}. Using 0.`);
                    hustleObject[header] = 0;
                } else {
                    hustleObject[header] = numValue;
                }
            } else {
                hustleObject[header] = value;
            }
        }
        
        // Add to hustle array
        hustleArray.push(hustleObject);
    }
    
    return hustleArray;
}

/**
 * Alternative function for students who want to use embedded CSV data
 * This avoids CORS issues entirely by using data stored in the JavaScript
 * 
 * @param {string} csvData - The CSV data as a string
 * @returns {Array} - Array of hustle objects
 */
function createHustleArrayFromData(csvData) {
    console.log('Creating hustle array from embedded data...');
    const hustleArray = parseCSVData(csvData);
    console.log(`Successfully created array with ${hustleArray.length} hustles`);
    return hustleArray;
}

/**
 * Utility function to validate that a hustle object has the expected properties
 * Students can use this to check if their data loaded correctly
 * 
 * @param {Object} hustle - A hustle object to validate
 * @returns {boolean} - True if the hustle has all required properties
 */
function validateHustle(hustle) {
    const requiredProperties = ['name', 'partner_org', 'impact_per_hour', 'training_time'];
    
    for (const prop of requiredProperties) {
        if (!(prop in hustle)) {
            console.warn(`Hustle object missing required property: ${prop}`);
            return false;
        }
    }
    
    // Check that numeric properties are actually numbers
    if (typeof hustle.impact_per_hour !== 'number' || typeof hustle.training_time !== 'number') {
        console.warn('Numeric properties (impact_per_hour, training_time) should be numbers');
        return false;
    }
    
    return true;
}

// Export functions for use in other scripts (if using modules)
// For simple HTML projects, these functions are available globally
