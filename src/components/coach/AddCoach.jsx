import React, { useEffect, useState, useRef } from "react";
import "../styles/CreateLead.css";
import axios from "axios";
import { ADD_COACH, SEARCH_CITY, ALL_SPORTS, getDecryptedToken } from "../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { skills } from '../utils/coachSkils';
import CoachLead from "../lead/CoachLead";
import { editStylingInput, editStylingTextarea, editStylingSelect1 } from "./../utils/variables";

const AddCoach = ({ onClose }) => {
    const decryptedToken = getDecryptedToken();
    const [selectedObj, setSelectedObj] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [sports, setSports] = useState([]);
    const [stateBtn, setStateBtn] = useState(0);
    const [trainingLocation, setTrainingLocation] = useState([]);
    const [userSkills, setUserSkills] = useState([]);
    const [addedSkils, setAddedSkills] = useState([]);
    const [editedItem, setEditedItem] = useState({
        name: "",
        phone: "",
        email: "",
        sport_id: 14,
        loc_id: "",
        about: "",
        skill: "",
        heighlight: "",
        fee: "",
        package: "",
        gender: "",
        training_location: "",
        common_location: "",
        experience: "",
        education: "",
        achievement: "",
    });
    const [keywords, setKeywords] = useState([
        "4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSports, setFilteredSports] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [noMatch, setNoMatch] = useState(false);
    const inputRef = useRef(null);
    // city dropdown useStates
    const [searchCity, setSearchCity] = useState("");
    const [filteredCity, setFilteredCity] = useState([]);
    const [isCityDropdownVisible, setIsCityDropdownVisible] = useState(false);
    const [noMatchCity, setNoMatchCity] = useState(false);
    const inputCityRef = useRef(null);
    // ============================================================sports dropdown code
    const handleSportInputChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value) {
            const filtered = sports.filter((sport) =>
                sport.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSports(filtered);
            setNoMatch(filtered.length === 0);
            setIsDropdownVisible(true);
        } else {
            setFilteredSports([]);
            setNoMatch(false);
            setIsDropdownVisible(false);
        }
        setStateBtn(1);
    };

    const handleSportSelect = (sport) => {
        setSearchTerm(sport.name);
        setEditedItem(prevState => ({
            ...prevState,
            sport_id: sport.id
        }));
        setFilteredSports([]);
        setIsDropdownVisible(false);
    };

    const handleClickOutside = (event) => {
        if (inputRef.current && !inputRef.current.contains(event.target)) {
            if (noMatch) {
                setSearchTerm('');
            } else if (filteredSports.length > 0) {
                setSearchTerm(filteredSports[0].name);
                setEditedItem(prevState => ({
                    ...prevState,
                    sport_id: filteredSports[0].id
                }));
            }
            setIsDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [filteredSports, noMatch]);

    //===================================================sport dropdown code ends here

    const fetchSports = () => {
        let body = {
            sort: "name asc"
        };
        axios.post(ALL_SPORTS, body, {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        })
            .then((response) => {
                setSports(response?.data?.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        fetchSports();
    }, []);

    // ============================================================city dropdown code
    const handleCityInputChange = (event) => {
        const value = event.target.value;
        setSearchCity(value);
        const body = {
            tbl: "adm_location_master",
            term: value
        }
        if (value) {
            axios.post(SEARCH_CITY, body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
                .then(response => {
                    setFilteredCity(response?.data?.data);
                    setNoMatchCity(response?.data?.data?.length === 0);
                    setIsCityDropdownVisible(true);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

        } else {
            setFilteredCity([]);
            setNoMatchCity(false);
            setIsCityDropdownVisible(false);
        }
        setStateBtn(1);
    };

    const handleCitySelect = (sport) => {
        setSearchCity(sport.city);
        setEditedItem(prevState => ({
            ...prevState,
            loc_id: sport.id,
            state: sport.state
        }));
        setFilteredCity([]);
        setIsCityDropdownVisible(false);
    };

    const handleClickCityOutside = (event) => {
        if (inputCityRef.current && !inputCityRef.current.contains(event.target)) {
            if (noMatchCity) {
                setSearchCity('');
            } else if (filteredCity.length > 0) {
                setSearchCity(filteredCity[0].name);
                setEditedItem(prevState => ({
                    ...prevState,
                    loc_id: filteredCity[0].id
                }));
            }
            setIsCityDropdownVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickCityOutside);
        return () => {
            document.removeEventListener('click', handleClickCityOutside);
        };
    }, [filteredCity, noMatchCity]);

    //===================================================city dropdown code ends here

    const capitalizeFirstLetterOfEachWord = (string) => {
        return string?.replace(/\b\w/g, char => char?.toUpperCase());
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newValue = (name === 'sport' || name === 'city' ? value?.toLowerCase() : value);
        let updatedValue = newValue;

        if (name === "name") {
            updatedValue = capitalizeFirstLetterOfEachWord(updatedValue);
        } else if (name === "email") {
            updatedValue = updatedValue?.toLowerCase();
        }

        let redText = false;
        let textRestrict = "";

        if (value) {
            const words = value.split(" ");
            words.forEach((word) => {
                if (keywords.includes(word?.toLowerCase())) {
                    textRestrict = word;
                    redText = true;
                    setStateBtn(0);
                }
            });
        }

        if (redText) {
            alert(`Warning: The word "${textRestrict}" is a restricted keyword.`);
            e.target.style.color = "red";
        } else {
            e.target.style.color = "";
        }

        setEditedItem({
            ...editedItem,
            [name]: updatedValue,
        });
        if (name === "sport_id") {
            const sport = value;
            if (skills[sport]) {
                setUserSkills(skills[sport]);
            } else {
                setUserSkills([]);
            }
            setAddedSkills([]);
        }
        setStateBtn(1);
    };
    const handleCheckboxChange = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            setTrainingLocation(prevLocations => [...prevLocations, value]);
        } else {
            setTrainingLocation(prevLocations =>
                prevLocations.filter(location => location !== value)
            );
        }
        setStateBtn(1);
    };
    const handleSkillChange = (event) => {
        const value = event.target.value;
        if (event.target.checked) {
            setAddedSkills(prevLocations => [...prevLocations, value]);
        } else {
            setAddedSkills(prevLocations =>
                prevLocations.filter(location => location !== value)
            );
        }
        setStateBtn(1);
    };
    const openModal = (object) => {
        setModalVisible(true);
        setSelectedObj(object);
    }

    const closeModal = () => {
        setModalVisible(false);
    };
    const handleUpdateClick = () => {
        setStateBtn(0);
        const updatedFields = {};
        for (const key in editedItem) {
            if (editedItem.hasOwnProperty(key)) {
                if (editedItem[key] !== "") {
                    updatedFields[key] = editedItem[key];
                }
            }
        }
        const updatedFormData = {
            ...updatedFields,
            training_location: trainingLocation.toString(),
            skill: addedSkils.toString(),
        };

        axios
            .post(ADD_COACH, updatedFormData
                , {
                    headers: {
                        Authorization: `Bearer ${decryptedToken}`,
                    },
                }
            )
            .then((response) => {
                if (response?.data?.status === 1) {
                    openModal(response?.data?.data?.insertId)
                    toast.success("Coach added successfully", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                    setTrainingLocation([]);
                    setEditedItem({
                        name: "",
                        phone: "",
                        email: "",
                        sport_id: 14,
                        city: "",
                        state: "",
                        about: "",
                        skill: "",
                        heighlight: "",
                        fee: "",
                        package: "",
                        gender: "",
                        training_location: "",
                        common_location: "",
                        experience: "",
                        education: "",
                        achievement: "",
                    });
                } else {
                    toast.error(response.data.message, {
                        position: "top-center",
                        autoClose: 1000,
                    });
                }
                setStateBtn(0);
            })
            .catch((error) => {
                console.log(error);
                toast.error("An error occurred while updating details", {
                    position: "top-center",
                    autoClose: 1000,
                });
            })
            .finally(() => {
                setStateBtn(0);
            });
    }

    return (
        <div className="modal-overlay">
            <div className="leftCreateClose" onClick={onClose}></div>
            <div className="modal-content">
                <div class="create-lead-top">
                    <p>Add Coach</p>
                    <p className="close-icon" onClick={onClose}>
                        X
                    </p>
                </div>
                <>
                    <div className="user-details--left">
                        <div className="leadDetailsLeft">
                            <div className="detailsBox">
                                <div className="detailsContent">
                                    <div className="detailsLeftContainer">
                                        <p>Name <span className="common-fonts redAlert"> *</span></p>
                                        <p>Email <span className="common-fonts redAlert"> *</span></p>
                                        <p>Sport <span className="common-fonts redAlert"> *</span></p>
                                        <p>phone <span className="common-fonts redAlert"> *</span></p>
                                        <p>Gender</p>
                                        <p>Fees</p>
                                        <p>Package</p>
                                        <p>Experience</p>
                                        <p>Education</p>
                                        <p>Achievement</p>
                                        <p>Profile Heading</p>
                                        <p>Certification</p>
                                        <p className="about-textarea">About</p>
                                    </div>
                                    <div className="detailsRightContainer">
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={editedItem?.name}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={editedItem?.email}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <>
                                            <div>
                                                <div ref={inputRef} style={{ position: 'relative', display: 'block' }}>
                                                    <div>
                                                        <input
                                                            id=""
                                                            name=""
                                                            value={searchTerm}
                                                            onChange={handleSportInputChange}
                                                            autoComplete="off"
                                                            className={"disabled sport_new_input"}
                                                            style={editStylingSelect1}
                                                        />
                                                    </div>
                                                    {isDropdownVisible && (
                                                        <div className='sport_box'>
                                                            {noMatch ? (
                                                                <div>No match found</div>
                                                            ) : (
                                                                filteredSports.map((sport) => (
                                                                    <div
                                                                        key={sport.id}
                                                                        onClick={() => handleSportSelect(sport)}
                                                                        style={{ padding: '5px', cursor: 'pointer' }}
                                                                    >
                                                                        {sport.name}
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={editedItem?.phone}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <select
                                                    name="gender"
                                                    id="gender"
                                                    value={editedItem?.gender || ""}
                                                    onChange={handleInputChange}

                                                    style={editStylingSelect1}
                                                >
                                                    <option value=""></option>
                                                    <option value="female">Female</option>
                                                    <option value="male">Male</option>
                                                </select>
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="fee"
                                                    value={editedItem?.fee}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="package"
                                                    value={editedItem?.package}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input list="experience" name="experience"
                                                    value={editedItem?.experience}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}
                                                />
                                                <datalist id="experience">
                                                    <option value="1"></option>
                                                    <option value="2"></option>
                                                    <option value="3"></option>
                                                    <option value="4"></option>
                                                    <option value="5"></option>
                                                    <option value="6"></option>
                                                    <option value="7"></option>
                                                    <option value="8"></option>
                                                    <option value="9"></option>
                                                    <option value="10"></option>
                                                    <option value="11"></option>
                                                    <option value="12"></option>
                                                    <option value="13"></option>
                                                    <option value="14"></option>
                                                    <option value="15"></option>
                                                    <option value="16"></option>
                                                    <option value="17"></option>
                                                    <option value="18"></option>
                                                    <option value="19"></option>
                                                    <option value="20"></option>
                                                    <option value="20+"></option>
                                                </datalist>
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="education"
                                                    value={editedItem?.education}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="achievement"
                                                    value={editedItem?.achievement}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="heighlight"
                                                    value={editedItem?.heighlight}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="certificate"
                                                    value={editedItem?.certificate}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <textarea
                                                    name="about"
                                                    onChange={handleInputChange}
                                                    value={editedItem?.about}
                                                    rows="5"
                                                    id=""
                                                    style={editStylingTextarea}

                                                ></textarea>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="detailsBox">
                                <p className="detailHead">ADDRESS INFORMATION</p>
                                <div className="detailsContent">
                                    <div className="detailsLeftContainer">
                                        <p>City <span className="common-fonts redAlert"> *</span></p>
                                        <p>State</p>
                                        <p>Training Location</p>
                                        <p>Common Location</p>
                                    </div>
                                    <div className="detailsRightContainer">
                                        <>
                                            <div>
                                                <div ref={inputCityRef} style={{ position: 'relative', display: 'block' }}>
                                                    <div>
                                                        <input
                                                            id=""
                                                            name=""
                                                            value={searchCity}
                                                            onChange={handleCityInputChange}
                                                            autoComplete="off"
                                                            className="disabled sport_new_input"
                                                            style={editStylingSelect1}
                                                        />
                                                    </div>
                                                    {isCityDropdownVisible && (
                                                        <div className='sport_box'>
                                                            {noMatchCity ? (
                                                                <div>No match found</div>
                                                            ) : (
                                                                filteredCity.map((city) => (
                                                                    <div
                                                                        key={city.id}
                                                                        onClick={() => handleCitySelect(city)}
                                                                        style={{ padding: '5px', cursor: 'pointer' }}
                                                                    >
                                                                        {city.locality_name}
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={editedItem?.state}
                                                    style={editStylingInput}
                                                    disabled
                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <div className="form-group-radio">
                                                    <label className="radio-inline">
                                                        <input
                                                            type="checkbox"
                                                            name="training_location"
                                                            value="1"
                                                            className="radio_disable check_input"

                                                            onChange={handleCheckboxChange}
                                                            checked={trainingLocation.includes("1")}
                                                        /> Online
                                                    </label>
                                                    <label className="radio-inline">
                                                        <input
                                                            type="checkbox"
                                                            name="training_location"
                                                            value="2"
                                                            className="radio_disable check_input"

                                                            onChange={handleCheckboxChange}
                                                            checked={trainingLocation.includes("2")}
                                                        /> Home
                                                    </label>
                                                </div>
                                            </span>
                                        </p>
                                        <br />
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="common_location"
                                                    value={editedItem?.common_location}
                                                    onChange={handleInputChange}
                                                    style={editStylingInput}

                                                />
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="detailsBox">
                                <p className="detailHead">ADDITIONAL INFORMATION</p>
                                <div className="detailsContent">
                                    <div className="detailsLeftContainer">
                                        <p>Skills</p>
                                    </div>
                                    <div className="detailsRightContainer">
                                        <p>
                                            <span>
                                                <div className="form-group-radio">
                                                    {userSkills.map((skill, index) => (
                                                        <label className="radio-inline" key={index}>
                                                            <input
                                                                type="checkbox"
                                                                name="userSkills"
                                                                value={skill}
                                                                className="radio_disable check_input"

                                                                onChange={handleSkillChange}
                                                                checked={addedSkils.includes(skill)}
                                                            />
                                                            {skill}
                                                        </label>
                                                    ))}
                                                </div>
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modalLeftBtnBox">
                            <span></span>
                            {stateBtn === 0 ? (
                                <button disabled className="disabledBtn">
                                    Save
                                </button>
                            ) : (
                                <button onClick={handleUpdateClick} className="convertToDeal">
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                </>
            </div>
            {modalVisible && (
                <CoachLead
                    selectedItem={selectedObj}
                    closeModal={closeModal}
                />
            )}
        </div>
    )
}

export default AddCoach