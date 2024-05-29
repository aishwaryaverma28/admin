import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { cdnurl, GET_PLAYER_ID, UPDATE_PLAYER, getDecryptedToken } from './../utils/Constants';
import { toast } from "react-toastify";
import USER from "../../assets/image/user-img.png"
const NewPlayerDetails = React.forwardRef(({ id, updateCheckState }, ref) => {
  const decryptedToken = getDecryptedToken();
  const [isLoading, setIsLoading] = useState(true);
  const [editedItem, setEditedItem] = useState({
    about: "",
    awards: "",
    city: "",
    address: "",
    dob: "",
    email: "",
    height: "",
    weight: "",
    phone: "",
    name: "",
    position: "",
    facebook: "",
    instagram: "",
    sport: "",
    state: "",
    type: ""
  });

  const [stateBtn, setStateBtn] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isHoverDisabled, setIsHoverDisabled] = useState(false);
  const [keywords, setKeywords] = useState([
    "4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"
]);

const capitalizeFirstLetterOfEachWord = (string) => {
  return string?.replace(/\b\w/g, char => char?.toUpperCase());
};

  const getAllPlayers = () => {
    const requestBody = {
      playerId: id,
      type: "temp"
    };
    axios
      .post(GET_PLAYER_ID, requestBody, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        const apiData = response?.data?.data[0];
        for (const key in apiData) {
          if (apiData.hasOwnProperty(key)) {
            if (key === 'dob') {
              const dateTimeString = apiData[key];
              if (dateTimeString) {
                const dateOnly = dateTimeString.split('T')[0];
                apiData[key] = dateOnly;
              }
            }
          }
        }
        setEditedItem(apiData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllPlayers();
  }, []);

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
    handleClick();
    setStateBtn(1);
  };

  const handleClick = () => {
    updateCheckState(true);
  };

  const toggleEditable = (e) => {
    e.preventDefault();
    setIsEditable(!isEditable);
    setIsDisabled(!isDisabled);
  };
  const handleUpdateClick = () => {
    const updatedFormData = {
      type: "temp",
      name: editedItem?.name?.trim(),
      email: editedItem?.email?.trim(),
      email_verified: editedItem?.email_verified,
      phone: editedItem?.phone?.trim(),
      mobile_verified: editedItem?.mobile_verified,
      sport: editedItem?.sport,
      city: editedItem?.city?.trim(),
      address: editedItem?.address?.trim(),
      state: editedItem?.state?.trim(),
      about: editedItem?.about?.trim(),
      awards: editedItem?.awards?.trim(),
      dob: editedItem?.dob?.trim(),
      height: editedItem?.height?.trim(),
      weight: editedItem?.weight?.trim(),
      position: editedItem?.position?.trim(),
      facebook: editedItem?.facebook?.trim(),
      instagram: editedItem?.instagram?.trim(),

    }
    axios
      .put(UPDATE_PLAYER + id, updatedFormData
        , {
          headers: {
            Authorization: `Bearer ${decryptedToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.status === 1) {
          toast.success("Details updated successfully", {
            position: "top-center",
            autoClose: 2000,
          });
        } else {
          toast.error(response?.data?.message, {
            position: "top-center",
            autoClose: 2000,
          });
        }
        setIsEditable(false);
        setIsDisabled(!isDisabled);
        updateCheckState(false);
        setStateBtn(0);
        getAllPlayers();
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred while updating details", {
          position: "top-center",
          autoClose: 2000,
        });
      })
      .finally(() => {
        setStateBtn(0);
      });
  }

  React.useImperativeHandle(ref, () => ({
    handleUpdateClick
  }));

  //======================================================================css variable

  const normalStylingInput = {
    color: "#1e2224",
    fontWeight: 400,
    border: "1px solid #dcdcdc",
    outline: "rgb(59, 59, 59)",
    backgroundColor: "#ffffff",
    fontSize: "0.8rem",
    fontFamily: "Lexend Deca",
    borderRadius: "0.3125rem",
    padding: "0.3rem",
    border: "1px solid transparent",
    height: "2rem",
    width: "100%"
  };

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

  const normalStylingTextarea = {
    color: "#1e2224",
    fontWeight: 400,
    border: "1px solid #dcdcdc",
    outline: "rgb(59, 59, 59)",
    backgroundColor: "#ffffff",
    fontSize: "0.8rem",
    fontFamily: "Lexend Deca",
    borderRadius: "0.3125rem",
    padding: "0.3rem",
    border: "1px solid transparent",
    height: "5rem",
    width: "100%"
  };


  return (<>
    <div className="user-details--left">
      <div className="user-details--heading">
        <div className="user-details-imgBox">
          <a href={editedItem?.logo === null
            ? `${cdnurl}coach/14/logo1.jpg`
            : `${cdnurl}player_temp/${editedItem?.id}/${editedItem?.logo}`} target="_blank" rel="noopener noreferrer">
            <img
              src={editedItem?.logo === null
                ? `${cdnurl}coach/14/logo1.jpg`
                : `${cdnurl}player_temp/${editedItem?.id}/${editedItem?.logo}`}
              alt="pofile"
              className="bmp-preview-image logoRound"
            />
          </a>
          <div>
            <p>
              {isLoading ? (
                <span>-</span>
              ) : (
                <>
                  {editedItem?.id}: {editedItem?.name}, {editedItem?.city}, {editedItem?.state}
                </>
              )}
            </p>
            <p style={normalStylingInput}>{editedItem?.url}</p>
          </div>
        </div>
        <a href="#" className="edit-details" onClick={toggleEditable}>
          <i className="fa-solid fa-pen"></i>
        </a>
      </div>
      <div className="leadDetailsLeft">
        <div className="detailsBox">
          <div className="detailsContent">
            <div className="detailsLeftContainer">
              <p>Names</p>
              <p>Email</p>
              <p>Phone</p>
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
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="name"
                      value={editedItem?.name}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p>
              {/* <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="email"
                      value={editedItem?.email}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p> */}
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span className='newEditableArea'>
                    <input
                      type="text"
                      name="email"
                      value={editedItem?.email}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled}
                    />
                    <label className="radio-inline radio-space">
                      <input
                        type="checkbox"
                        name="email_verified"
                        value={editedItem?.email_verified}
                        className="radio_disable check_input"
                        disabled={isDisabled}
                        onChange={handleInputChange}
                        checked={editedItem?.email_verified === 1}
                      /> Email Verified

                    </label>
                  </span>
                )}
              </p>
              {/* <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="phone"
                      value={editedItem?.phone}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p> */}
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span className='newEditableArea'>
                    <input
                      type="text"
                      name="phone"
                      value={editedItem?.phone}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled}
                    />
                    <label className="radio-inline radio-space">
                      <input
                        type="checkbox"
                        name="mobile_verified"
                        value={editedItem?.mobile_verified}
                        className="radio_disable check_input"
                        disabled={isDisabled}
                        onChange={handleInputChange}
                        checked={editedItem?.mobile_verified === 1}
                      /> Mobile Verified

                    </label>
                  </span>
                )}
              </p>
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input list="sports" name="sport"
                      value={editedItem?.sport}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled} />
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
                    </datalist>
                  </span>
                )}
              </p>
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="awards"
                      value={editedItem?.awards}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p>
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="date"
                      name="dob"
                      value={editedItem?.dob || ''}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p>
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="height"
                      value={editedItem?.height}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p>
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="weight"
                      value={editedItem?.weight}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p>
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="position"
                      value={editedItem?.position}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p>
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="facebook"
                      value={editedItem?.facebook}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p>
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="instagram"
                      value={editedItem?.instagram}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p>
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <textarea
                      name="about"
                      onChange={handleInputChange}
                      value={isLoading ? "-" : editedItem?.about}
                      rows="5"
                      id=""
                      style={
                        isEditable ? editStylingTextarea : normalStylingTextarea
                      }
                      disabled={isDisabled}
                    ></textarea>
                  </span>
                )}
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
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="address"
                      value={editedItem?.address}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p>
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="city"
                      value={editedItem?.city}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p>
              <p>
                {isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <input
                      type="text"
                      name="state"
                      value={editedItem?.state}
                      onChange={handleInputChange}
                      style={
                        isEditable ? editStylingInput : normalStylingInput
                      }
                      disabled={isDisabled}
                    />
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

      </div>
      {isEditable ? (
        <div className="modalLeftBtnBox">
          <span></span>
          {/* <button
            className="convertToDeal"
            onClick={() => handleViewSite(editedItem?.url)}
          >
            View Site
          </button> */}
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
      ) : (
        <div className="modalLeftBtnBox">
          <span></span>
          {/* <button
            className="convertToDeal"
            onClick={() => handleViewSite(editedItem?.url)}
          >View Site
          </button> */}
        </div>
      )}
    </div>
  </>)
});

export default NewPlayerDetails;
