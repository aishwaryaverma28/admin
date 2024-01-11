const stateMapping = {
    "AN": "Andaman and Nicobar Islands",
    "AP": "Andhra Pradesh",
    "AR": "Arunachal Pradesh",
    "AS": "Assam",
    "BR": "Bihar",
    "CG": "Chandigarh",
    "CH": "Chhattisgarh",
    "DN": "Dadra and Nagar Haveli",
    "DD": "Daman and Diu",
    "DL": "Delhi",
    "GA": "Goa",
    "GJ": "Gujarat",
    "HR": "Haryana",
    "HP": "Himachal Pradesh",
    "JK": "Jammu and Kashmir",
    "JH": "Jharkhand",
    "KA": "Karnataka",
    "KL": "Kerala",
    "LA": "Ladakh",
    "LD": "Lakshadweep",
    "MP": "Madhya Pradesh",
    "MH": "Maharashtra",
    "MN": "Manipur",
    "ML": "Meghalaya",
    "MZ": "Mizoram",
    "NL": "Nagaland",
    "OR": "Odisha",
    "PY": "Puducherry",
    "PB": "Punjab",
    "RJ": "Rajasthan",
    "SK": "Sikkim",
    "TN": "Tamil Nadu",
    "TS": "Telangana",
    "TR": "Tripura",
    "UP": "Uttar Pradesh",
    "UK": "Uttarakhand",
    "WB": "West Bengal"
};

export const splitAddress = (address) => {
    console.log(address?.entity_name);

    // Split the address using a comma
    const addressArray = address?.entity_name?.split(',');

    // Trim each part to remove leading and trailing whitespaces
    const trimmedAddressArray = addressArray.map(part => part.trim());

    // Filter out the string "India" from the array
    const filteredAddressArray = trimmedAddressArray.filter(part => part.toLowerCase() !== 'india');

    // Initialize variables for state and city
    let state = '';
    let city = '';

    // Iterate through the filtered array to find state and city
    filteredAddressArray.forEach(part => {
        // Check if the part is a state
        if (stateMapping[part.toUpperCase()]) {
            state = stateMapping[part.toUpperCase()];
        } else {
            // If not a state, consider it as a city
            city = part;
        }
    });

    // Log the state and city
    console.log('State:', state);
    console.log('City:', city);

    // Return an object containing state and city if you want to use them elsewhere
    return { state, city };
};
