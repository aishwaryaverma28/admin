import React, { useState, useEffect } from "react";
import "../styles/HelpModal.css";
import axios from "axios";
import { UPDATE_ACADEMY, RESTRICTED_KEYWORDS
  // , getDecryptedToken
 } from "../utils/Constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateStrategyModal = ({ onClose,fetchData, updateIndex, name, description}) => {
console.log(name);
console.log(description)
  // const decryptedToken = getDecryptedToken();
  const academyId = localStorage.getItem("academy_id");
  const [stateBtn, setStateBtn] = useState(0);
  const [sName, setSName] = useState(name[updateIndex]);
  const [descrip, setDescrip] = useState(description[updateIndex]);
  const [initialName, setInitialName] = useState(name[updateIndex]);
  const [initialDescrip, setInitialDescrip] = useState(description[updateIndex]);
  const [keywords, setKeywords] = useState([
    "murder",
    "kill",
    "killer",
    "kill you",
    "4r5e", "5h1t", "5hit", "a55", "anal", "anus", "ar5e", "arrse", "arse", "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", "asswhole", "a_s_s", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", "bloody", "blow job", "blowjob", "blowjobs", "boiolas", "bollock", "bollok", "boner", "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggitt", "faggot", "faggs", "fagot", "fagots", "fags", "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "God", "god-dam", "god-damned", "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", "homo", "hore", "horniest", "horny", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", "penis", "penisfucker", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", "s.o.b.", "sadist", "schlong", "screwing", "scroat", "scrote", "scrotum", "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitters", "shitting", "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "son-of-a-bitch", "spac", "spunk", "s_h_i_t", "t1tt1e5", "t1tties", "teets", "teez", "testical", "testicle", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker", "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead", "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"
  ]);
  // const getAllKeywords = () => {
  //   axios.get(RESTRICTED_KEYWORDS, {
  //     headers: {
  //       Authorization: `Bearer ${decryptedToken}`,
  //     },
  //   })
  //     .then((response) => {
  //       const newKeywords = response?.data?.data.map(keywordObj => keywordObj.keyword);
  //       setKeywords(newKeywords);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }
  // useEffect(() => {
  //   getAllKeywords();
  // }, [])

  const handleNameChange = (e) => {
    const newStrategyName = e.target.value;let redText = false;
    let disableSaveButton = false;
    const words = newStrategyName.split(' ');
    let textRestrict = "";
    words.forEach((word) => {
      if (keywords.includes(word?.toLowerCase())) {
        textRestrict = word;
        redText = true;
        disableSaveButton = true;
      }
    });
    if (redText) {
      alert(`Warning: The word "${textRestrict}" is a restricted keyword.`);
      e.target.style.color = 'red';
    } else {
      e.target.style.color = '';
    }
    setStateBtn(disableSaveButton ? 0 : 1);
    setSName(newStrategyName);
  };

  const handleDescChange = (e) => {
    const newStrategyName = e.target.value;
    let redText = false;
    let disableSaveButton = false;
    const words = newStrategyName.split(' ');
    let textRestrict = "";
    words.forEach((word) => {
      if (keywords.includes(word?.toLowerCase())) {
        textRestrict = word;
        redText = true;
        disableSaveButton = true;
      }
    });
    if (redText) {
      alert(`Warning: The word "${textRestrict}" is a restricted keyword.`);
      e.target.style.color = 'red';
    } else {
      e.target.style.color = '';
    }
    setStateBtn(disableSaveButton ? 0 : 1);
    setDescrip(newStrategyName);
  };

  const handleCancel = () => {
    setSName(initialName);
    setDescrip(initialDescrip);
    setStateBtn(0);
  };

  const handleUpdate = () => {
    const updatedNameArray = [...name];
    const updatedDescriptionArray = [...description];
    updatedNameArray[updateIndex] = sName;
    updatedDescriptionArray[updateIndex] = descrip;
    const updatedNameString = updatedNameArray?.reverse()?.join('$@$@$');
    const updatedDescriptionString = updatedDescriptionArray?.reverse()?.join('$@$@$');
    axios
      .put(
        UPDATE_ACADEMY + academyId,
        {
          strategy_name: updatedNameString,
          training_strategy: updatedDescriptionString,
        }
        // ,
        // {
        //   headers: {
        //     Authorization: `Bearer ${decryptedToken}`,
        //   }
        // }
      )
      .then((response) => {
        fetchData();
        onClose();
      })
      .catch((error) => {
        console.error("API call failed:", error);
      });
  };


  return (
    <>
      <div className="help-modal-container">
        <div className="help-modal-box">
          <section>
            <div className="bmp-add-new-batch">
              <p className="common-fonts bmp-add-heading">Update Strategy</p>
            </div>

            <div className="bmp-modal-form">
              <div className="bmp-add-fields">
                <label htmlFor="" className="common-fonts light-color">
                  Strategy Name
                </label>
                <input
                  type="text"
                  className="common-fonts common-input bmp-modal-input"
                  value={sName}
                  onChange={handleNameChange}
                />
              </div>
              <div className="bmp-add-fields">
                <label htmlFor="" className="common-fonts light-color">
                  Strategy Description
                </label>
                <textarea
                  name=""
                  id=""
                  rows="5"
                  className="common-fonts bmp-strategy-input bmp-modal-input"
                  value={descrip}
                  onChange={handleDescChange}
                ></textarea>
              </div>
            </div>

            <div className="bmp-add-bottom-btn">
              <button className="common-fonts common-white-button" onClick={handleCancel}>
                Cancel
              </button>
              {stateBtn === 0 ? (
                <button className="disabledBtn">Update</button>
              ) : (
                <button
                  className="common-fonts common-save-button"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              )}
            </div>
          </section>
        </div>
        <div className="help-cross" onClick={onClose}>
          X
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateStrategyModal;
