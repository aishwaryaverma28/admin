import React, { useEffect, useState } from "react";
import "../styles/CreateLead.css";
import axios from "axios";
import { ADD_PLAYER, getDecryptedToken } from "../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlayerLead from "./PlayerLead"
const AddPlayer = ({ onClose }) => {
    const decryptedToken = getDecryptedToken();
    const [selectedObj, setSelectedObj] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [editedItem, setEditedItem] = useState({
        about: "",
        awards: "",
        city: "",
        address: "",
        dob: "",
        email: "",
        height: "",
        weight: "",
        mobile: "",
        name: "",
        position: "",
        facebook: "",
        instagram: "",
        sport: "",
        state: "",
        type: ""
    });
    const [stateBtn, setStateBtn] = useState(0);
    const [isHoverDisabled, setIsHoverDisabled] = useState(false);
    const [keywords, setKeywords] = useState([
        "4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"
    ]);

    const capitalizeFirstLetterOfEachWord = (string) => {
        return string?.replace(/\b\w/g, char => char?.toUpperCase());
    };

    const openModal = (object) => {
        setModalVisible(true);
        setSelectedObj(object);
    }
    const closeModal = () => {
        setModalVisible(false);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? (checked ? 1 : 0) : (name === 'sport' || name === 'city' ? value?.toLowerCase() : value);
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
        setStateBtn(1);
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

        axios
            .post(ADD_PLAYER, updatedFields
                , {
                    headers: {
                        Authorization: `Bearer ${decryptedToken}`,
                    },
                }
            )
            .then((response) => {
                if (response?.data?.status === 1) {
                    openModal(response?.data?.data?.insertId)
                    toast.success("Player added successfully", {
                        position: "top-center",
                        autoClose: 1000,
                    });
                    setEditedItem({
                        about: "",
                        awards: "",
                        city: "",
                        address: "",
                        dob: "",
                        email: "",
                        height: "",
                        weight: "",
                        mobile: "",
                        name: "",
                        position: "",
                        facebook: "",
                        instagram: "",
                        sport: "",
                        state: "",
                        address: "",
                        type: ""
                    });
                } else {
                    toast.error(response?.data?.message, {
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


    //======================================================================css variable
    const editStylingInput = {
        color: "#1e2224",
        fontWeight: 400,
        border: "1px solid #dcdcdc",
        outline: "rgb(59, 59, 59)",
        backgroundColor: "#ffffff",
        fontSize: "0.8rem",
        fontFamily: "Lexend Deca",
        borderRadius: "0.3125rem",
        padding: "0.3rem",
        border: "1px solid #dcdcdc",
        height: "2rem",
        width: "100%",

        ":hover": {
            backgroundColor: isHoverDisabled ? "rgb(227, 225, 225)" : "",
            transition: isHoverDisabled ? "all .5s ease-in-out" : "",
            cursor: isHoverDisabled ? "pointer" : "",
        },
        ":focus": {
            border: "1px solid #E2E9F2",
            boxShadow: "none",
        },
    };
    const editStylingTextarea = {
        color: "#1e2224",
        fontWeight: 400,
        border: "1px solid #dcdcdc",
        outline: "rgb(59, 59, 59)",
        backgroundColor: "#ffffff",
        fontSize: "0.8rem",
        fontFamily: "Lexend Deca",
        borderRadius: "0.3125rem",
        padding: "0.3rem",
        border: "1px solid #dcdcdc",
        height: "5rem",
        width: "100%",

        ":hover": {
            backgroundColor: isHoverDisabled ? "rgb(227, 225, 225)" : "",
            transition: isHoverDisabled ? "all .5s ease-in-out" : "",
            cursor: isHoverDisabled ? "pointer" : "",
        },
        ":focus": {
            border: "1px solid #E2E9F2",
            boxShadow: "none",
        },
    };
    return (
        <div className="modal-overlay">
            <div className="leftCreateClose" onClick={onClose}></div>
            <div className="modal-content">
                <div class="create-lead-top">
                    <p>Add Player</p>
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
                                        <p>Name</p>
                                        <p>Email</p>
                                        <p>Mobile</p>
                                        <p>Sport</p>
                                        <p>Awards</p>
                                        <p>Date of Birth</p>
                                        <p>Height</p>
                                        <p>Weight</p>
                                        <p>Position</p>
                                        <p>Facebook</p>
                                        <p>Instagram</p>
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
                                                    style={
                                                        editStylingInput
                                                    }

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
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p>
                                        <p>

                                            <span>
                                                <input
                                                    type="text"
                                                    name="mobile"
                                                    value={editedItem?.mobile}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p>
                                        <p>

                                            <span>
                                                <input list="sports" name="sport"
                                                    value={editedItem?.sport}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }
                                                />
                                                <datalist id="sports">
                                                    <option value="archery"></option>
                                                    <option value="arts"></option>
                                                    <option value="athletics"></option>
                                                    <option value="aerobics"></option>
                                                    <option value="badminton"></option>
                                                    <option value="basketball"></option>
                                                    <option value="bodybuilding"></option>
                                                    <option value="billiards"></option>
                                                    <option value="boxing"></option>
                                                    <option value="chess"></option>
                                                    <option value="cricket"></option>
                                                    <option value="fencing"></option>
                                                    <option value="football"></option>
                                                    <option value="golf"></option>
                                                    <option value="gym"></option>
                                                    <option value="hockey"></option>
                                                    <option value="kabaddi"></option>
                                                    <option value="karate"></option>
                                                    <option value="kho-kho"></option>
                                                    <option value="mma"></option>
                                                    <option value="motorsports"></option>
                                                    <option value="rugby"></option>
                                                    <option value="shooting"></option>
                                                    <option value="skating"></option>
                                                    <option value="sports"></option>
                                                    <option value="squash"></option>
                                                    <option value="swimming"></option>
                                                    <option value="table-Tennis"></option>
                                                    <option value="taekwondo"></option>
                                                    <option value="tennis"></option>
                                                    <option value="volleyball"></option>
                                                    <option value="wrestling"></option>
                                                    <option value="yoga"></option>
                                                    <option value="Personal Gym Trainer"></option>
                                                    <option value="Fitness Training"></option>
                                                    <option value="Pilates"></option>
                                                    <option value="baseball"></option>
                                                    <option value="silambam"></option>
                                                    <option value="snooker"></option>
                                                    <option value="handball"></option>
                                                    <option value="carrom"></option>
                                                </datalist>
                                            </span>
                                        </p>
                                        <p>

                                            <span>
                                                <input
                                                    type="text"
                                                    name="awards"
                                                    value={editedItem?.awards}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p>
                                        <p>

                                            <span>
                                                <input
                                                    type="date"
                                                    name="dob"
                                                    value={editedItem?.dob || ''}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="height"
                                                    value={editedItem?.height}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p>
                                        <p>
                                            <span>
                                                <input
                                                    type="text"
                                                    name="weight"
                                                    value={editedItem?.weight}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p>
                                        <p>

                                            <span>
                                                <input
                                                    type="text"
                                                    name="position"
                                                    value={editedItem?.position}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p>
                                        <p>

                                            <span>
                                                <input
                                                    type="text"
                                                    name="facebook"
                                                    value={editedItem?.facebook}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p> <p>

                                            <span>
                                                <input
                                                    type="text"
                                                    name="instagram"
                                                    value={editedItem?.instagram}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

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
                                                    style={
                                                        editStylingTextarea
                                                    }

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
                                        <p>Address</p>
                                        <p>City</p>
                                        <p>State</p>
                                    </div>
                                    <div className="detailsRightContainer">
                                        <p>

                                            <span>
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={editedItem?.address}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p>
                                        <p>

                                            <span>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    value={editedItem?.city}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
                                            </span>
                                        </p>
                                        <p>

                                            <span>
                                                <input
                                                    type="text"
                                                    name="state"
                                                    value={editedItem?.state}
                                                    onChange={handleInputChange}
                                                    style={
                                                        editStylingInput
                                                    }

                                                />
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
                <PlayerLead
                    selectedItem={selectedObj}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default AddPlayer