/*  My Schema for Hustle Objects
    name: Label for the opportunity; show in results
    partner_org: Filter by organization
    impact_per_hour: Sort by impact intensity (people helped/items delivered per hour)
    training_time: Sort by ramp-up (lower = quicker to start)
*/

// Side Hustle Data Array
let hustles = [];

// Embedded CSV data to avoid CORS issues
const csvData = `name,partner_org,impact_per_hour,training_time
Tutor Buddy Algebra,Local Middle School,2,1
Homework Helpline Text Review,Community Center,3,0.5
Storytime Reader,Public Library,10,1
Book Drive Sorter,Public Library,40,0.5
Food Pantry Packager,City Food Bank,25,1
Community Garden Harvester,Community Garden,20,1
Park Litter Sweep,City Parks Dept,2,0.5
Recycling Ambassador Table,School Green Team,12,0.5
Elder Tech Setup,Senior Center,3,1.5
Senior Letter Writer,Senior Center,8,0.5
Pet Shelter Socializer,Animal Shelter,4,1
Pet Adoption Profile Writer,Animal Shelter,5,1
STEM Workshop Assistant,STEM Nonprofit,12,1.5
Science Fair Coach,School Science Club,4,2
Art Supply Organizer,Art Center,30,0.5
Event Water Refill Monitor,Event Sustainability Team,60,0.5
Bike Repair Pop Up Helper,Bike Coop,3,2
Coat Drive Organizer,School PTA,25,1
Toy Repair Station,Makerspace,4,1.5
Neighborhood Tree Watering,Neighborhood Association,6,0.5
Trail Signage Updater,City Parks Dept,6,1
Community Bulletin Board Curator,Community Center,8,0.5
Translation Buddy Spanish English,Community Center,3,1.5
Captioning Volunteer,Accessibility Alliance,6,1
Podcast Transcription Helper,Community Media Lab,5,1
Open Source Docs Contributor,Open Source Project,4,1.5
Local History Scanner,Historical Society,15,1
Library Book Mender,Public Library,6,1
Hospital Care Cards Crafter,Hospital Volunteers,20,0.5
School Garden Compost Turner,School Garden,5,0.5
Rain Barrel Installer,Environmental Club,2,2
E Waste Collection Helper,Recycling Center,12,1
Beach Cleanup Lead,Ocean Conservancy,6,1
Riverbank Sampling Assistant,River Watch Group,5,1.5
Neighborhood Map Data Collector,Open Data Group,10,1
Free Little Library Steward,Little Free Library Network,12,0.5
Homework Club Snack Prep,School PTA,30,0.5
After School Chess Mentor,School Chess Club,4,1
Debate Prep Coach,Debate Club,3,1
Classroom Maker Cart Restocker,School Custodial Team,40,0.5`;

/**
 * Function to populate the hustles array by reading from embedded CSV data
 * This avoids CORS issues that occur when trying to fetch local files
 */
function populateHustlesArray() {
    try {
        // Clear the existing hustles array
        hustles = [];
        
        // Split CSV into lines
        const lines = csvData.split('\n');
        
        // Get headers from first line
        const headers = lines[0].split(',').map(header => header.trim());
        
        // Loop through each data line (skip header at index 0)
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            
            // Skip empty lines
            if (line === '') {
                continue;
            }
            
            // Split the line into values
            const values = line.split(',').map(value => value.trim());
            
            // Create hustle object using headers as property names
            const hustleObject = {};
            
            // Loop through headers to create object properties
            for (let j = 0; j < headers.length; j++) {
                const header = headers[j];
                const value = values[j];
                
                // Convert numeric fields to numbers
                if (header === 'impact_per_hour' || header === 'training_time') {
                    hustleObject[header] = parseFloat(value);
                } else {
                    hustleObject[header] = value;
                }
            }
            
            // Add to hustles array
            hustles.push(hustleObject);
        }
        
        console.log(`Successfully loaded ${hustles.length} side hustles from embedded data`);
        return hustles;
        
    } catch (error) {
        console.error('Error loading side hustles:', error);
        return [];
    }
}

populateHustlesArray();
