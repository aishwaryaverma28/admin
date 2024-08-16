import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { cdnurl, ALL_SPORTS, SEARCH_CITY, GET_PLAYER_ID, UPDATE_PLAYER, getDecryptedToken, EMAIL_VERIFY } from './../utils/Constants';
import { toast } from "react-toastify";
import { normalStylingInput, editStylingInput, editStylingSelect1, normalStylingSelect1 } from "./../utils/variables";
import CoachSkills from '../coach/CoachSkills';
import PlayerAwards from './PlayerAwards';
import PlayerEdu from './PlayerEdu';
import PlayerExp from './PlayerExp';
import QuillEditor from '../QuillEditor';
import tick from "../../assets/image/star_tick.svg"
import cross from "../../assets/image/unverified.svg"

const PlayerDetails = React.forwardRef(({ id, updateCheckState }, ref) => {
  const decryptedToken = getDecryptedToken();
  const [isLoading, setIsLoading] = useState(true);
  const [sports, setSports] = useState([]);
  const [emailVeri, setEmailVeri] = useState(false);
  const [editedItem, setEditedItem] = useState({
    about: "",
    awards: "",
    loc_id: "",
    city_id: "",
    address: "",
    dob: "",
    email: "",
    heighlight: "",
    height: "",
    weight: "",
    phone: "",
    name: "",
    position: "",
    facebook: "",
    instagram: "",
    sport_id: 14,
    type: ""
  });

  const [stateBtn, setStateBtn] = useState(0);
  const [isEditable, setIsEditable] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
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
  // player skills component useState
  const [newSkills, setNewSkills] = useState([]);
  // player awards component useState
  const [newAwards, setNewAwards] = useState([]);
  // player education component useState
  const [eduData, setEduData] = useState([]);
  //player height state
  const [height, setHeight] = useState([]);
  //player experience
  const [expData, setExpData] = useState([]);
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
      sport_id: sport.id,
      skill: "",
    }));
    setNewSkills([]);
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
          sport_id: filteredSports[0]?.id,
          skill: "",
        }));
        setNewSkills([]);
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
    setSearchCity(sport?.city + ", " + sport?.state + " (" + sport?.type + ")");
    setEditedItem(prevState => ({
      ...prevState,
      loc_id: sport?.id,
      city_id: sport?.city_id,
      location_state: sport?.state,
      city: sport?.city + ", " + sport?.state + " (" + sport?.type + ")",
    }));
    setFilteredCity([]);
    setIsCityDropdownVisible(false);
  };

  const handleClickCityOutside = (event) => {
    if (inputCityRef.current && !inputCityRef.current.contains(event.target)) {
      if (noMatchCity) {
        setSearchCity('');
      } else if (filteredCity.length > 0) {
        setSearchCity(filteredCity[0]?.city + ", " + filteredCity[0]?.state + " (" + filteredCity[0]?.type + ")");
        setEditedItem(prevState => ({
          ...prevState,
          loc_id: filteredCity[0]?.id,
          city_id: filteredCity[0]?.city_id,
          location_state: filteredCity[0]?.state,
          city: filteredCity[0]?.city + ", " + filteredCity[0]?.state + " (" + filteredCity[0]?.type + ")",
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

  const getAllPlayers = () => {
    const requestBody = {
      "playerId": id,
      "type": "org"
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
        if (response?.data?.data[0]?.sport_id) {
          setSearchTerm(response?.data?.data[0]?.sport_name)
        }
        if(response?.data?.data[0]?.loc_id === 17500){
          setSearchCity(response?.data?.data[0]?.city)
        } else{
          setSearchCity(response?.data?.data[0]?.location_locality)
        }
        if (response?.data?.data[0]?.height) {
          setHeight(response?.data?.data[0]?.height?.split(";"))
        }
        if (response?.data?.data[0]?.awards) {
          setNewAwards(response?.data?.data[0]?.awards?.split(","))
        }
        if (response?.data?.data[0]?.skill) {
          const skillArray = response?.data?.data[0]?.skill?.split(',');
          setNewSkills(skillArray);
        }
        if (response?.data?.data[0]?.email) {
          checkEmail(response?.data?.data[0]?.email);
        }
        if (apiData?.education) {
          const educationArray = apiData.education.split(',').map(item => {
            const [degree, college] = item.split(';');
            return { degree, college };
          });
          setEduData(educationArray);
        }
        if (apiData?.experience) {
          const expArray = apiData.experience.split(',').map(item => {
            const [playedFor, date, description] = item.split(';');
            return { playedFor, date, description };
          });
          setExpData(expArray);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function checkEmail(email) {
    axios.post(EMAIL_VERIFY, { email: email }, {
      headers: {
        Authorization: `Bearer ${decryptedToken}`,
      },
    })
      .then((response) => {
        console.log(response?.data?.status);
        if (response?.data?.status === 1) {
          setEmailVeri(true);
        }
      })
      .catch((error) => [
        console.log(error)
      ])
  }
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
        getAllPlayers();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchSports();
  }, []);
  useEffect(() => {
    getAllPlayers();
  }, [sports]);
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
  const handleDataTransfer = (data) => {
    if (!isDisabled) {
      setEditedItem({
        ...editedItem,
        about: data,
      });
    }
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

  // player skills component code
  const addSkills = (skill) => {
    setNewSkills([...newSkills, skill]);
    setStateBtn(1);
    handleClick();
  };

  const deleteSkills = (index) => {
    setNewSkills(newSkills.filter((_, i) => i !== index));
    setStateBtn(1);
    handleClick();
  };

  const updateSkills = (index, newValue) => {
    const updatedFaqs = newSkills.map((faq, i) => (i === index ? newValue : faq));
    setNewSkills(updatedFaqs);
    setStateBtn(1);
    handleClick();
  };
  // player skills component code ended

  // player Awards component code
  const addAwards = (skill) => {
    setNewAwards([...newAwards, skill]);
    setStateBtn(1);
    handleClick();
  };

  const deleteAwards = (index) => {
    setNewAwards(newAwards.filter((_, i) => i !== index));
    setStateBtn(1);
    handleClick();
  };

  const updateAwards = (index, newValue) => {
    const updatedFaqs = newAwards.map((faq, i) => (i === index ? newValue : faq));
    setNewAwards(updatedFaqs);
    setStateBtn(1);
    handleClick();
  };
  // player Awards component code ended
  /// player education component code start
  const handleAdd = (newEdu) => {
    const updatedEdus = [...eduData, newEdu];
    setEduData(updatedEdus);
    setStateBtn(1);
    handleClick();
  };

  const handleUpdate = (index, field, value) => {
    const updatedEdus = eduData.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setEduData(updatedEdus);
    setStateBtn(1);
    handleClick();
  };

  const handleDelete = (index) => {
    const updatedEdus = eduData.filter((edu, i) => i !== index);
    setEduData(updatedEdus);
    setStateBtn(1);
    handleClick();
  };
  // player education component code ended
  const handleChangeHeight = (index, event) => {
    const newHeight = [...height];
    newHeight[index] = event.target.value;
    setHeight(newHeight);
    setStateBtn(1);
    handleClick();
  };
  //player experience code begins
  const handleAddExp = (newEdu) => {
    const updatedEdus = [...expData, newEdu];
    setExpData(updatedEdus);
    setStateBtn(1);
    handleClick();
  };

  const handleUpdateExp = (index, field, value) => {
    const updatedEdus = expData.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setExpData(updatedEdus);
    setStateBtn(1);
    handleClick();
  };

  const handleDeleteExp = (index) => {
    const updatedEdus = expData.filter((edu, i) => i !== index);
    setExpData(updatedEdus);
    setStateBtn(1);
    handleClick();
  };
  //player experience code ends here
  const handleUpdateClick = () => {
    const edu = eduData.map(item => `${item.degree};${item.college}`).join(',');
    const exp = expData.map(item => `${item.playedFor};${item.date};${item.description}`).join(',');
    
    // Base form data
    const baseFormData = {
      type: "org",
      name: editedItem?.name?.trim(),
      email: editedItem?.email?.trim(),
      email_verified: editedItem?.email_verified,
      phone: editedItem?.phone?.trim(),
      mobile_verified: editedItem?.mobile_verified,
      sport_id: editedItem?.sport_id,
      loc_id: editedItem?.loc_id,
      city_id: editedItem?.city_id,
      city: editedItem?.city,
      address: editedItem?.address?.trim(),
      about: editedItem?.about?.trim(),
      dob: editedItem?.dob,
      skill: newSkills?.join(","),
      heighlight: editedItem?.heighlight?.trim(),
      education: edu,
      experience: exp,
      height: height?.join(";"),
      awards: newAwards?.join(','),
      weight: editedItem?.weight?.trim(),
      position: editedItem?.position?.trim(),
      facebook: editedItem?.facebook?.trim(),
      instagram: editedItem?.instagram?.trim(),
    };
  
    if (editedItem?.loc_id === 17500) {
      baseFormData.postcode = editedItem?.postcode;
    }
  
    axios
      .put(UPDATE_PLAYER + id, baseFormData, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
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
  };
  
  React.useImperativeHandle(ref, () => ({
    handleUpdateClick
  }));

  const handleViewSite = (url) => {
    const siteUrl = url;
    if (siteUrl) {
      window.open(siteUrl, "_blank");
    } else {
      alert("Site URL is not available");
    }
  };

  return (
    <>
      <div className="user-details--left">
        <div className="user-details--heading">
          <div className="user-details-imgBox">
            <a href={editedItem?.logo === null
              ? `${cdnurl}asset/images/logo.svg`
              : `${cdnurl}player/${editedItem?.id}/${editedItem?.logo}`} target="_blank" rel="noopener noreferrer">
              <img
                src={editedItem?.logo === null || editedItem?.logo === ""
                  ? `${cdnurl}asset/images/logo.svg`
                  : `${cdnurl}player/${editedItem?.id}/${editedItem?.logo}`}
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
                    {editedItem?.id}: {editedItem?.name}, {editedItem?.location_city}, {editedItem?.location_state}
                  </>
                )}
              </p>
              <p style={normalStylingInput}>{editedItem?.url}</p>
              <p className='viewsCount'>Views: {editedItem?.views}</p>
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
                <p>Name</p>
                <p>Email</p>
                <p>Phone</p>
                <p>Highlights</p>
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
                <p>
                  {isLoading ? (
                    <span>-</span>
                  ) : (
                    <span className='newEditableArea'>
                      <input
                        type="email"
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
                        <div className="mail">
                          {emailVeri ? <button className='btn-verified'>Verified</button> : <button className='btn-unverified'>Verify Now</button>}
                        </div>
                      </label>
                    </span>
                  )}
                </p>
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
                      <input
                        type="text"
                        name="heighlight"
                        value={editedItem?.heighlight}
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
                    <div className='heightFields'>
                      <input
                        type="number"
                        value={height[0] || ''}
                        onChange={(e) => handleChangeHeight(0, e)}
                        style={isEditable ? editStylingInput : normalStylingInput}
                        disabled={isDisabled}
                      />
                      <p className='playerHeight'>ft</p>
                      <input
                        type="number"
                        value={height[1] || ''}
                        onChange={(e) => handleChangeHeight(1, e)}
                        style={isEditable ? editStylingInput : normalStylingInput}
                        disabled={isDisabled}
                      />
                      <p className='playerHeight'>inch</p>
                    </div>
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
                      <div className={`notesEditor ${isEditable ? 'details' : 'editDetails'}`}>
                        <QuillEditor
                          onDataTransfer={handleDataTransfer}
                          initialContent={editedItem?.about}
                          readOnly={isDisabled}
                        />
                      </div>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="detailsBox">
            <p className="detailHead">CHANGE SPORT AND SUBCATEGORIES</p>
            <div className="detailsContent">
              <div className="detailsLeftContainer">
                <p>Sport</p>
                <p>Sub category</p>
              </div>

              <div className="detailsRightContainer">
                <p>
                  {isLoading ? (
                    <span>-</span>
                  ) : (
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
                              className={isDisabled ? "disabled sport_new_input" : "sport_new_input"}
                              style={isEditable ? editStylingSelect1 : normalStylingSelect1}
                              disabled={isDisabled}
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
                  )}
                </p>
                <p>
                  {isLoading ? (
                    <span>-</span>
                  ) : (
                    <span>
                      <CoachSkills
                        isEditable={isEditable}
                        isDisabled={isDisabled}
                        faqs={newSkills}
                        addSkills={addSkills}
                        deleteSkills={deleteSkills}
                        updateSkills={updateSkills}
                      />
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="detailsBox">
            <p className="detailHead">ADDRESS INFORMATION</p>
            {editedItem?.loc_id === 17500 ? <>
              <div className="detailsContent">
                <div className="detailsLeftContainer">
                  <p>Address</p>
                  <p>City</p>
                  <p>State</p>
                  <p>Postcode</p>
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
                            className={isDisabled ? "disabled sport_new_input" : "sport_new_input"}
                            style={isEditable ? editStylingSelect1 : normalStylingSelect1}
                            disabled={isDisabled}
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
                                  style={{ padding: '5px', cursor: 'pointer', textTransform: 'capitalize' }}
                                >
                                  {city?.locality_name}, {city?.city}, {city?.state} ({city?.id})
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="state"
                          value={editedItem?.state}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled
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
                          type="number"
                          name="postcode"
                          value={editedItem?.postcode}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled
                        />
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </> : <>
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
                            className={isDisabled ? "disabled sport_new_input" : "sport_new_input"}
                            style={isEditable ? editStylingSelect1 : normalStylingSelect1}
                            disabled={isDisabled}
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
                                  style={{ padding: '5px', cursor: 'pointer', textTransform: 'capitalize' }}
                                >
                                  {city?.locality_name}, {city?.city}, {city?.state} ({city?.id})
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                  <p>
                    {isLoading ? (
                      <span>-</span>
                    ) : (
                      <span>
                        <input
                          type="text"
                          name="state"
                          value={editedItem?.location_state}
                          style={
                            isEditable ? editStylingInput : normalStylingInput
                          }
                          disabled
                        />
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </>}

          </div>
          <div className="detailsBox">
            <p className="detailHead">ADDITIONAL INFORMATION</p>
            <div className="detailsContent">
              <div className="detailsLeftContainer3">
                <p>Awards</p>
                <p>Education</p>
                <p>Experience</p>
              </div>
              <div className="detailsRightContainer">
                <p>{isLoading ? (
                  <span>-</span>
                ) : (
                  <span>
                    <PlayerAwards
                      isEditable={isEditable}
                      isDisabled={isDisabled}
                      faqs={newAwards}
                      addSkills={addAwards}
                      deleteSkills={deleteAwards}
                      updateSkills={updateAwards}
                    />
                  </span>
                )}</p>

                <p>
                  {isLoading ? (
                    <span>-</span>
                  ) : (
                    <span>
                      <PlayerEdu
                        isEditable={isEditable}
                        isDisabled={isDisabled}
                        eduData={eduData}
                        onAdd={handleAdd}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                      />
                    </span>
                  )}
                </p>
                <p>
                  {isLoading ? (
                    <span>-</span>
                  ) : (
                    <span>
                      <PlayerExp
                        isEditable={isEditable}
                        isDisabled={isDisabled}
                        expData={expData}
                        onAdd={handleAddExp}
                        onUpdate={handleUpdateExp}
                        onDelete={handleDeleteExp}
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
            <button
              className="convertToDeal"
              onClick={() => handleViewSite(editedItem?.url)}
            >
              View Site
            </button>
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
            <button
              className="convertToDeal"
              onClick={() => handleViewSite(editedItem?.url)}
            >View Site
            </button>
          </div>
        )}
      </div>
    </>)
});

export default PlayerDetails;
