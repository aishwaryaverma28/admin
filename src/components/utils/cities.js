export const cities = [
    "Delhi", "Bengaluru", "Pune", "Gurugram", "Ghaziabad", "Noida", "Chennai", "Mumbai", "Lucknow", "Hyderabad",
    "Jaipur", "Faridabad", "Coimbatore", "Ahmedabad", "Kolkata", "Kochi", "Greater Noida", "Kanpur", "Agra",
    "Meerut", "Dehradun", "Nagpur", "Aurangabad", "Pimpri-Chinchwad", "Thrissur", "Patna", "Erode", "Guwahati",
    "Ernakulam", "Vadodara", "Indore", "Varanasi", "Salem", "Jammu", "Thane", "Jalandhar", "Raipur", "Chandigarh",
    "Jamshedpur", "Bhubaneswar", "Panchkula", "Ranchi", "Surat", "Ludhiana", "Zirakpur", "Nashik", "Kozhikode",
    "Secunderabad", "Kalyan", "Patiala", "Dharwad", "Madurai", "Akola", "Shillong", "Sangli", "Bhopal", "Vadoodara",
    "Tiruchirappalli", "Thiruvananthapuram", "Haridwar", "Hosur", "Ajmer", "Nagercoil", "Rohtak", "Saharanpur",
    "Imphal", "Kadapa", "Nandgaon", "Kottayam", "Bisokhar", "Mysore", "Mira Bhayandar", "Amravati", "Panaji",
    "Sulumjuri", "Tikri", "Satara", "Aluva", "Malappuram", "Anantapur", "Periapillaivalasai", "Dombivli", "Belgaum",
    "Aligarh", "Itanagar", "Kashipur", "Ambernath", "Jabalpur", "Karnal", "Solapur", "Mathura", "Samaspur",
    "Muzaffarpur", "Bagalkot", "Hapur", "Anantnag", "Udumalpet", "Nala Sopara", "Howrah", "Bareilly", "Churachandpur",
    "Tiruvannamalai", "NilganjBazar", "Siliguri", "Tiruppur", "Gobi", "NikolGam", "Khuntuni", "Karur", "Baraut",
    "Baramula", "Raiwala", "Nallagandla", "Sonipat", "Rajkot", "Doorbhash Nagar", "Arjungan", "Kotamangalam",
    "Darbhanga", "Kolhapur", "Rajamahendravaram", "Fatehpur", "Perumbavoor", "Morti", "Pattambi", "Mallapur",
    "Margao", "Birpara", "Anand", "Mithapukur more", "KaranjaBhilai", "Shyampura", "Madikovil Vidhi", "Vijayapuram",
    "Chharodi", "Raghujinagar", "Kottarakara", "Bikaner", "Panipat", "Bommanahalli", "Ahmednagar", "Gwalior",
    "Manipur", "Bandhwari", "RajNagar", "Ganganagar", "Namrup", "Bhiwandi", "Aziznagar", "Sanagner", "Gopala Extension",
    "Ulubari", "Ambala Cantt", "Banguluru", "Warangal", "Tikaitpur", "Palakkad", "Hajipur", "Bokkaro steel city",
    "KamlaNagar", "Sitapura", "Alwar", "Bonda", "PalladamRoad", "Tilkamanjhi", "Latifabad", "Belagavi", "Kerala",
    "Pudupakkam", "Ponneri", "Chopda", "Burhanpur", "Jalalpur", "Sherpur", "Jhajra", "Beawar", "orrakadu", "Bagadpur",
    "Palayamkottai", "Narsinghgar", "Vijayawada", "Belgaum City", "Shimoga", "Basirhat", "Hisar", "Vasundhara",
    "Kommaghatta", "Amritsar", "Chittaranjan", "Badlapur", "Vallabh Vidyanagar Anand", "Bhilwara", "Jind",
    "New Chandigarh", "Azamgarh", "Durgapur", "Namkum", "Dimapur", "Vijayapura", "Jwalasal Urf Karayal", "Chainpur",
    "Baluwa", "DomkhelWasti", "Eranamkulam", "Poonamallee", "Pothinamallayyapalem", "Chakbanjarewal", "Theri",
    "VasantKunj", "Chengalayi", "Jharkhand", "Hubballi", "Kulti", "Kushinagar", "Govindanpe", "Mehsana", "Hubli",
    "Palarivattom", "Basavanakunte", "Kolar", "Maharashtra", "Kakkanad", "Bommasandra", "Rudrapur", "Vaduvucode",
    "Kalol", "Soobabazar", "Paratwada", "Sanquelim", "Bilaspur", "Pathankot", "Talukamaval", "Bhalariya", "Raigarh",
    "CollegeRoad", "Rishikesh", "Chakan", "KorattiSouth", "Perungalathur", "Baghpat", "Deoria", "Nasik", "Nanded",
    "Mandhana", "Dera Bassi", "Bandra West", "Nizamabad", "Mohali", "Puzhuthivakkam", "Telangana", "Mau",
    "Panjgrainkalan", "Kilmudalambedu", "Moga", "Kolhaura", "Kadegaon", "Kothamangalam", "Kohima", "Sasaram",
    "Madukkarai", "Dumardaga", "Thaltej bodakdev", "Achouba", "Khaspur", "Katedhan", "Kalyangarh", "Karumandapam",
    "Tallakulam", "Roing", "Halduchaur", "Fatehgunj", "Sholinganallur", "Roorkee", "Trivandrum", "Sambalpur",
    "Bariatukhalsa", "Mysuru", "Sirsaim", "Mulund West", "Khordha", "Gachibowli", "Vandalur", "Vannarpettai",
    "Kota", "Kannur", "Puraisawakam", "Hasanparthy", "Zuarinagar", "Begusarai", "Vadavalli", "bodakdev", "Palawa",
    "BandlagudaJagir", "Chintal", "Muragachha", "Thalinji", "Jodhpur", "Tirunelveli", "PethVadgaon", "Selakui",
    "Navi Mumbai", "Samastipur", "Thergaon", "Pallikaranai", "Gandhigramam", "Karumathampatti", "Jachonda", "Purulia",
    "Puppalguda", "Shopian", "Manjalpur", "Gajuwaka", "Vaishali Nagar", "Chanakya Puri", "Gautam Budh Nagar",
    "Ghasauli", "Hathod", "Shirdi", "NetuaGrameen", "Faizabad", "Shahbad", "Cuttack", "Davanagere", "Amroha",
    "Panihati", "Alappuzha", "Bhadravati", "Ella", "Padur", "Calicut", "Spituk Leh Union", "BhayandarWest", "Uppal",
    "Aizwal", "Permanallur", "Kaniya", "Dariyapur Patna", "Salempur", "Mudar", "Bhagirathi", "Ernamkulam",
    "Kurukshetra", "Pimpri", "Muzaffarabad", "Kelambakkam", "Sharjah", "Pratapgarh", "Mandi Dabwali", "Khar West",
    "Ranjhawala"
  ];
  