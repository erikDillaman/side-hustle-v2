/*  My Schema for Hustle Objects
    name: Label for the opportunity; show in results
    partner_org: Filter by organization
    impact_per_hour: Sort by impact intensity (people helped/items delivered per hour)
    training_time: Sort by ramp-up (lower = quicker to start)
*/

// Side Hustle Data Array
let hustles = [];

const slots = [
    document.getElementById('numOne'),
    document.getElementById('numTwo'),
    document.getElementById('numThree'),
    document.getElementById('numFour'),
    document.getElementById('numFive')
]

loadSideHustleData('side-hustle-v2.csv');

function displayResults(hustleArray) {
    slots[0].textContent = hustleArray[0].name + " - $" + hustleArray[0].hourlyRate + "/hr (Costs: $" + hustleArray[0].costs + ")";
    slots[1].textContent = hustleArray[1].name + " - $" + hustleArray[1].hourlyRate + "/hr (Costs: $" + hustleArray[1].costs + ")";
    slots[2].textContent = hustleArray[2].name + " - $" + hustleArray[2].hourlyRate + "/hr (Costs: $" + hustleArray[2].costs + ")";
    slots[3].textContent = hustleArray[3].name + " - $" + hustleArray[3].hourlyRate + "/hr (Costs: $" + hustleArray[3].costs + ")";
    slots[4].textContent = hustleArray[4].name + " - $" + hustleArray[4].hourlyRate + "/hr (Costs: $" + hustleArray[4].costs + ")";  
}


document.addEventListener('DOMContentLoaded', function() {
    const buttonOne = document.getElementById('buttonOne');
    buttonOne.addEventListener('click', displayResults(hustles));

    const buttonTwo = document.getElementById('buttonTwo');
    buttonTwo.addEventListener('click', displayResults(hustles));
});