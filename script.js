/*  My Schema for Hustle Objects
    name: Label for the opportunity; show in results
    partner_org: Filter by organization
    impact_per_hour: Sort by impact intensity (people helped/items delivered per hour)
    training_time: Sort by ramp-up (lower = quicker to start)
*/

// Side Hustle Data Array
let hustles = [];

const slots = [
    document.querySelector('#hustle-1 .hustle-label'),
    document.querySelector('#hustle-2 .hustle-label'),
    document.querySelector('#hustle-3 .hustle-label'),
    document.querySelector('#hustle-4 .hustle-label'),
    document.querySelector('#hustle-5 .hustle-label')
];

function firstFive(hustleArray) {
    slots[0].textContent = hustleArray[0].name + " - " + hustleArray[0].partner_org + " (Impact: " + hustleArray[0].impact_per_hour + "/hr)";
    slots[1].textContent = hustleArray[1].name + " - " + hustleArray[1].partner_org + " (Impact: " + hustleArray[1].impact_per_hour + "/hr)";
    slots[2].textContent = hustleArray[2].name + " - " + hustleArray[2].partner_org + " (Impact: " + hustleArray[2].impact_per_hour + "/hr)";
    slots[3].textContent = hustleArray[3].name + " - " + hustleArray[3].partner_org + " (Impact: " + hustleArray[3].impact_per_hour + "/hr)";
    slots[4].textContent = hustleArray[4].name + " - " + hustleArray[4].partner_org + " (Impact: " + hustleArray[4].impact_per_hour + "/hr)";  
}

function lastFive(hustleArray) {
    slots[0].textContent = hustleArray[hustles.length-1].name + " - " + hustleArray[hustles.length-1].partner_org + " (Impact: " + hustleArray[hustles.length-1].impact_per_hour + "/hr)";
    slots[1].textContent = hustleArray[hustles.length-2].name + " - " + hustleArray[hustles.length-2].partner_org + " (Impact: " + hustleArray[hustles.length-2].impact_per_hour + "/hr)";
    slots[2].textContent = hustleArray[hustles.length-3].name + " - " + hustleArray[hustles.length-3].partner_org + " (Impact: " + hustleArray[hustles.length-3].impact_per_hour + "/hr)";
    slots[3].textContent = hustleArray[hustles.length-4].name + " - " + hustleArray[hustles.length-4].partner_org + " (Impact: " + hustleArray[hustles.length-4].impact_per_hour + "/hr)";
    slots[4].textContent = hustleArray[hustles.length-5].name + " - " + hustleArray[hustles.length-5].partner_org + " (Impact: " + hustleArray[hustles.length-5].impact_per_hour + "/hr)";  
}

document.addEventListener('DOMContentLoaded', async function() {
    // Load data first
    await createHustleArray('side-hustles-v2.csv');
    
    const buttonOne = document.getElementById('button-one');
    if (buttonOne) {
        buttonOne.addEventListener('click', () => firstFive(hustles));
    }

    const buttonTwo = document.getElementById('button-two');
    if (buttonTwo) {
        buttonTwo.addEventListener('click', () => lastFive(hustles));
    }
});