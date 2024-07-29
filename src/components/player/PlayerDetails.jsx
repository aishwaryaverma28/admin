import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { cdnurl, ALL_SPORTS, SEARCH_CITY, GET_PLAYER_ID, UPDATE_PLAYER, getDecryptedToken } from './../utils/Constants';
import { toast } from "react-toastify";
import { normalStylingInput, editStylingInput, editStylingSelect1, normalStylingSelect1 } from "./../utils/variables";
import CoachSkills from '../coach/CoachSkills';
import PlayerAwards from './PlayerAwards';
import PlayerEdu from './PlayerEdu';
import PlayerExp from './PlayerExp';
import QuillEditor from '../QuillEditor';

const categories = {
  1: ['Football Goalkeeper', 'Football Defenders', 'Midfielders', 'Football Forwards'], //football
  2: ['Guards', 'Basketball Forwards', 'Centers'], //basketball
  3: ['Batsman', 'Bowlers', 'Wicketkeepers', 'All Rounder'], //Cricket
  4: ['Kumite Fighters', 'Kata Competitors', 'Special Technique'], //karate
  5: ['Styles'], //swimming
  6: ['Singles', 'Doubles'], //badminton
  7: ['Tee Shot', 'Fairway', 'Approach Shot', 'Short Game', 'Putting', 'Golf-All-Rounder'], //golf
  8: ['Rifle', 'Pistol', 'Shotgun', 'Running Target Shooters', 'Shooting-All-Rounder'], //shooting done
  9: ['MMA Strikers', 'Grapplers', 'MMA-All-Rounder', 'MMA Specialists', 'MMA Defenders'], //MMA
  10: ['Raiders', 'Kabaddi Defenders', 'Kabaddi-All-Rounder'], //kabaddi
  11: ['Artistic Gymnast', 'Rhythmic Gymnast', 'Trampoline Gymnast'], //gymnastics
  12: ['Dance', 'Painting'], //arts
  13: ['Opening Players', 'Midgame Players', 'Endgame Players', 'Chess Defensive Players', 'Aggressive Players'], //chess
  15: ['Hockey Forwards', 'Defensemen', 'Goal keeper', 'Specialists'], //hockey done
  16: ['Singles Players', 'Doubles Players', 'Tennis-All-Rounder'], //tennis
  17: ['Wrestler Styles'], //wretling*
  18: ['Weight Classes', 'Fighting Styles'], //boxing
  19: ['Drivers', 'Pit Crew Members', 'Engineers'], //motorsports
  20: ['Pool Players', 'Snooker Players', 'Carom Billiards Players', 'Trick Shot Artists'], //billiard
  21: ['Table Tennis Offensive Players', 'Table Tennis Defensive Players', 'Table Tennis All Rounder'], //table-tennis
  22: ['Chasers', 'Defenders'], //khokho
  23: ['Offensive Players', 'Defensive Players','All-Round Squash Player','Shot Specialists', 'Positional Players'], //squash
  24: ['Epee', 'Foil', 'Sabre', 'Fencing-All-Rounder'], //fencing
  25: ['Figure Skating', 'Speed Skating', 'Inline Skating', 'Roller Derby'], //skating
  26: ['Sprinters', 'Middle Distance Runners', 'Long Distance Runners', 'Hurdlers', 'Jumpers', 'Throwers', 'Combined Events'], //athletics
  27: ['Setters', 'Outside Hitters','Middle Blockers', 'Libero'], //volleyball
  28: ['Sparring', 'Forms', 'Breaking'], //teakwando* 
  29: ['Recurve Archery', 'Compound Archery', 'Barebow Archery', 'Flight Archery', 'Bowhunting'], //archery
  30: ['Forwards', 'Backs'], //rugby
  31: ['Weightlifting', 'Cardio Training', 'Functional Training', 'Group Fitness'], //gym
  32: ['Hatha Yoga', 'Vinyasa Yoga', 'Ashtanga Yoga', 'Yin Yoga', 'Restorative Yoga', 'Prenatal Yoga', 'Kids Yoga'], // yog
  34: ['Strength Training', 'Cardiovascular Training', 'Functional-Training', 'Flexibility and Mobility Training', 'Nutrition Coaching', 'Specialized Training'], // personal-trainer
  35: ['Silambam Weapon Techniques', 'Silambam Empty Hand Techniques', 'Silambam Form Demonstrations'], // silambam
  36: ['Infielders', 'Outfielders', 'Pitchers', 'Catchers'], //baseball
  37: ['Snooker Offensive Players', 'Snooker Defensive Players', 'Snooker All-Round Players', 'Cue Ball Control', 'Break-Off Specialist'], //snooker
  38: ['Carrom Strikers', 'Queen Specialists', 'Board Control', 'Break Specialists', 'Carrom-All-Rounder'], //carrom
  39: ['Goalkeepers', 'Backcourt Players', 'Wing Players', 'Pivot Players', 'Defense Specialists'], //handball
  40: ['Weapon Techniques', 'Empty Hand Techniques', 'Healing Techniques', 'Form Demonstrations'], //kalaripayayttu  
};


const subCategories = {


  // 1.Football
  'Football Goalkeeper': ['Traditional Goalkeeper', 'Sweeper Keeper'],
  'Football Defenders': ['Center Backs', 'Full Backs', 'Wing Backs', 'Sweepers'],
  'Midfielders': ['Central Midfielders', 'Defensive Midfielders', 'Attacking Midfielders', 'Wide Midfielders'],
  'Football Forwards': ['Strikers', 'Wingers', 'Centre Forwards', 'Second Strikers'],

    // 2.Basketball
    'Guards': ['Point Guard', 'Shooting Guard'],
    'Basketball Forwards': ['Small Forward', 'Power Forward'],
    'Centers': ['Center'],

      // 3.Cricket
  'Batsman': ['Opening Batsman', 'Top-Order Batsman', 'Middle-Order Batsman', 'Lower-Order Batsman'],
  'Bowlers': ['Fast Bowlers', 'Medium-Pace Bowlers', 'Spin Bowlers'],
  'Wicketkeepers': ['Specialist Wicketkeeper', 'Batsman-Wicketkeeper'],
  'All Rounder': ['Batting All-Rounder', 'Bowling All-Rounder'],

    // 4.Karate
    'Kumite Fighters': ['Offensive Fighter', 'Defensive Fighter'],
    'Kata Competitors': ['Individual Kata', 'Team Kata'],
    'Special Technique': ['Breaking Techniques', 'Demonstration Techniques'],

      //5. Swimming
  'Styles': ['Freestyle Swimmer', 'Backstroke Swimmer', 'Breaststroke Swimmer', 'Butterfly Swimmer', 'Individual Medley Swimmer', 'Distance Swimmer', 'Sprint Swimmer', 'Relay Swimmer', 'Open Water Swimmer'],

    //6. Badminton
    'Singles': ['Men\'s Singles', 'Women\'s Singles'],
    'Doubles': ['Men\'s Doubles', 'Women\'s Doubles', 'Mixed Doubles'],

      //7. Golf
  'Tee Shot': ['Driver Specialist'],
  'Fairway': ['Fairway Specialist'],
  'Approach Shot': ['Iron Specialist'],
  'Short Game': ['Wedge Specialist'],
  'Putting': ['Putter Specialist'],
  'Golf-All-Rounder': ['Versatile Player'],

    //8. Shooting
    'Rifle': ['Air Rifle', 'Prone Rifle'],
    'Pistol': ['Air Pistol', 'Rapid Fire Pistol'],
    'Shotgun': ['Trap', 'Skeet'],
    'Running Target Shooters': ['Moving Target'],
    'Shooting-All-Rounder': ['Versatile Shooter'],

      //9. MMA
  'MMA Strikers': ['Boxer', 'Muay Thai Fighter'],
  'Grapplers': ['Wrestler', 'Brazilian Jiu-Jitsu'],
  'MMA-All-Rounder': ['Mixed Martial Artist'],
  'MMA Specialists': ['Submission Specialist', 'Ground-and-Pound Fighter'],
  'MMA Defenders': ['Counter Striker'],

    //10. Kabbadi
    'Raiders': ['Lead Raider', 'Secondary Raider'],
    'Kabaddi Defenders': ['Cover Defender', 'Corner Defender'],
    'Kabaddi-All-Rounder': ['Lead All-Rounder', 'Support All-Rounder'],

      //11. Gymnastics
  'Artistic Gymnast': ['Floor Specialist', 'Uneven Bars Specialist', 'Balance Beam Specialist', 'Vault Specialist'],
  'Rhythmic Gymnast': ['Hoop Specialist', 'Ball Specialist', 'Ribbon Specialist'],
  'Trampoline Gymnast': ['Trampoline Specialist'],

    //12. Arts
    'Dance': ['Ballet Dancer', 'Contemporary Dancer', 'Hip-Hop Dancer'],
    'Painting': ['Abstract', 'Acrylic', 'Watercolor'],

      //13. Chess
  'Opening Players': ['Opening Specialist'],
  'Midgame Players': ['Tactician', 'Strategist'],
  'Endgame Players': ['Endgame Specialist'],
  'Chess Defensive Players': ['Defender'],
  'Aggressive Players': ['Attacker'],

    //15. Hockey
    'Hockey Forwards': ['Left Wing', 'Right Wing', 'Center'],
    'Defensemen': ['Left Defense', 'Right Defense'],
    'Goal keeper': ['Goalkeeper'],
    'Specialists': ['Power Play Specialist', 'Penalty Kill Specialist'],

      //16. Tennis
  'Singles Players': ['Baseline Player', 'Serve-and-Volley Player', 'All-Court Player'],
  'Doubles Players': ['Net Player', 'Baseline Doubles Player'],
  'Tennis-All-Rounder': ['Versatile Doubles Player'],

    //17. Wrestling
    'Wrestler Styles': ['Freestyle Wrestlers', 'Greco-Roman Wrestlers', 'Submission Wrestlers'],

      //18. Boxing
  'Weight Classes': ['Flyweight', 'Bantamweight', 'Featherweight', 'Lightweight', 'Welterweight', 'Middleweight', 'Heavyweight'],
  'Fighting Styles': ['Out-Boxer', 'Swarmer', 'Counterpunch', 'Slugger'],

    //19. Motorsports
    'Drivers': ['Formula 1 Driver', 'Rally Driver', 'Endurance Driver', 'NASCAR Driver', 'MotoGP Rider'],
    'Pit Crew Members': ['Chief Mechanic','Tire Specialist', 'Fuel Specialist'],
    'Engineers': ['Race Engineer', 'Data Analyst'],

      //20. Billiards
  'Pool Players': ['8-Ball Player', '9-Ball Player', 'Straight Pool Player'],
  'Snooker Players': ['Break Builder', 'Safety Player'],
  'Carom Billiards Players': ['3-Cushion Specialist', 'Artistic Billiards Player'],
  'Trick Shot Artists': ['Trick Shot Specialist'],

    //21. Table tennis
    'Table Tennis Offensive Players': ['Attacker', 'Loop Driver'],
    'Table Tennis Defensive Players': ['Chopper', 'Blocker'],
    'Table Tennis All Rounder': ['All-Round Attacker', 'Counter Driver'],

    //22. Kho-Kho
  'Chasers': ['Attacker', 'Pole Diver', 'Chain Chaser'],
  'Defenders': ['Dodger', 'Pole Dodger', 'Chain Dodger'],

  //23. Squash
  'Offensive Players':['Attacker'],
  'Defensive Players':['Retriever'],
  'All-Round Squash Player':['All-Court Player'],
  'Shot Specialists':['Drop Shot Specialist', 'Lob Specialist'],
  'Positional Players':['Front Court Player', 'Back Court Player'],

    //24. Fencing
    'Epee': ['Offensive Epeeist', 'Defensive Epeeist'],
    'Foil': ['Offensive Foilist', 'Defensive Foilist'],
    'Sabre': ['Offensive Sabreur', 'Defensive Sabreur'],
    'Fencing-All-Rounder': ['Versatile Fencer'],

    //25. Skating
    'Figure Skating': ['Singles Skater', 'Pairs Skater', 'Ice Dancers'],
    'Speed Skating': ['Short Track Skater', 'Long Track Skater'],
    'Inline Skating': ['Freestyle Skater', 'Speed Skater'],
    'Roller Derby': ['Jammer','Blocker'],

      //26. Athletics
  'Sprinters': ['100m Sprinter', '200m Sprinter'],
  'Middle Distance Runners': ['800m Runner', '1500m Runner'],
  'Long Distance Runners': ['5000m Runner', '10000m Runner'],
  'Hurdlers': ['110m Hurdles', '400m Hurdles'],
  'Jumpers': ['Long Jump', 'High Jump', 'Triple Jump'],
  'Throwers': ['Shot Putter', 'Discus Thrower', 'Javelin Thrower', 'Hammer Thrower'],
  'Combined Events': ['Decathlete', 'Heptathlete'],

    //27. Volleyball
    'Setters': ['Main Setter', 'Secondary Setter'],
    'Outside Hitters': ['Left-side Hitter', 'Right-side Hitter'],
    'Middle Blockers': ['Quick Middle', 'Strong Middle'],
    'Libero': ['Defensive Libero', 'Serving Libero'],


    //28. Teakwando
    'Sparring': ['Offensive Fighter', 'Defensive Fighter', 'Counter Attacker'],
    'Forms': ['Individual Poomsae', 'Team Poomsae'],
    'Breaking': ['Power Breaking', 'Technical Breaking'],


  //29. Archery
  'Recurve Archery': ['Target Archer', 'Field Archer'],
  'Compound Archery': ['Target Archer', '3D Archer'],
  'Barebow Archery': ['Target Archer', 'Field Archer'],
  'Flight Archery': ['Distance Shooter'],
  'Bowhunting': ['Bowhunter'],

    
  //30. Rugby
  'Forwards': ['Prop', 'Hooker', 'Lock', 'Flanker', 'Number 8'],
  'Backs': ['Scrum-Half', 'Fly-Half', 'Center', 'Wing', 'Full-Back'],

  //31. Gym
  'Weightlifting': ['Bodybuilder', 'Powerlifter', 'Olympic Weightlifter'],
  'Cardio Training': ['Runner', 'Cyclist'],
  'Functional Training': ['CrossFit Athlete', 'HIIT Trainer'],
  'Group Fitness': ['Aerobics Instructor', 'Yoga Instructor'],

      //32. Yoga
      'Hatha Yoga': ['Beginner Instructor', 'Advanced Instructor'],
      'Vinyasa Yoga': ['Flow Instructor'],
      'Ashtanga Yoga': ['Primary Series Instructor', 'Advanced Series Instructor'],
      'Yin Yoga': ['Yin Instructor'],
      'Restorative Yoga': ['Restorative Instructor'],
      'Prenatal Yoga': ['Prenatal Instructor'],
      'Kids Yoga': ['Kids Instructor'],

  //34. persnol trainer
  'Strength Training': ['Weightlifting Coach', 'Powerlifting Coach', 'Bodybuilding Coach'],
  'Cardiovascular Training': ['Running Coach', 'Cycling Coach'],
  'Functional-Training': ['CrossFit Coach', 'HIIT Coach'],
  'Flexibility and Mobility Training': ['Yoga Instructor', 'Pilates Instructor'],
  'Nutrition Coaching': ['Nutritionist'],
  'Specialized Training': ['Rehabilitation Trainer', 'Sports Performance Coach'],

      //35. Silambam
'Silambam Weapon Techniques': ['Single Stick Fighter', 'Double Stick Fighter', 'Long Stick Fighter', 'Short Stick Fighter', 'Knife Fighter'],
  'Silambam Empty Hand Techniques': ['Striker', 'Grappler'],
  'Silambam Form Demonstrations': ['Performer', 'Choreographer'],
  
  //36. Baseball
  'Infielders': ['First Baseman', 'Second Baseman', 'Shortstop', 'Third Baseman'],
  'Outfielders': ['Left Fielder', 'Center Fielder', 'Right Fielder'],
  'Pitchers': ['Starting Pitcher', 'Relief Pitcher', 'Closer'],
  'Catchers': ['Catcher'],

    //37. Snooker
'Snooker Offensive Players': ['Break Builder', 'Potting Specialist'],
'Snooker Defensive Players': ['Safety Player', 'Snooker Specialist'],
'Snooker All-Round Players': ['Versatile Player'],
'Cue Ball Control': ['Positioning Expert'],
'Break-Off Specialist': ['Break-Off Expert'],

  
  //38. Carrom
  'Carrom Strikers': ['Offensive Striker', 'Defensive Striker'],
  'Queen Specialists': ['Queen Hunter'],
  'Board Control': ['Center Control Player', 'Edge Control Player'],
  'Break Specialists': ['Break Expert'],
  'Carrom-All-Rounder': ['All-Round Player'],

    //39. Handball
    'Goalkeepers': ['Primary Goalkeeper', 'Reserve Goalkeeper'],
    'Backcourt Players': ['Left Back', 'Right Back', 'Center Back'],
    'Wing Players': ['Left Wing', 'Right Wing'],
    'Pivot Players': ['Pivot'],
    'Defense Specialists': ['Defense Specialist'],
    

  //40. Kalaripayattu
  'Weapon Techniques': ['Long Stick Fighter', 'Short Stick Fighter', 'Dagger Fighter', 'Sword and Shield Fighter', 'Flexible Sword Fighter'],
  'Empty Hand Techniques': ['Striker', 'Grappler'],
  'Healing Techniques': ['Marma Specialist'],
  'Form Demonstrations': ['Performers'],
};

const PlayerDetails = React.forwardRef(({ id, updateCheckState }, ref) => {
  const decryptedToken = getDecryptedToken();
  const [isLoading, setIsLoading] = useState(true);
  const [sports, setSports] = useState([]);
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
  const [sport, setSport] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState({});
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
    setSport(sport.id);
    setEditedItem(prevState => ({
      ...prevState,
      sport_id: sport.id,
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
        setSport(filteredSports[0].id);
        setEditedItem(prevState => ({
          ...prevState,
          sport_id: filteredSports[0].id,
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

  useEffect(() => {
    if (sport && categories[sport]) {
      setSubCategoryOptions(categories[sport]);
    } else {
      setSubCategoryOptions([]);
    }
    setSelectedCategories([]);
    setSubSubCategories({});
  }, [sport]);

  const handleSubCategoryChange = (e) => {
    const category = e.target.value;
    if (category && !selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
      setSubSubCategories((prev) => ({
        ...prev,
        [category]: subCategories[category] || []
      }));
    }
  };

  const handleAddCategory = () => {
    const availableOptions = categories[sport].filter(option => !selectedCategories.includes(option));
    setSubCategoryOptions(availableOptions);
  };

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
        if (response?.data?.data[0]?.location_city) {
          setSearchCity(response?.data?.data[0]?.location_city)
        } else if (response?.data?.data[0]?.location_city) {
          setSearchCity(response?.data?.data[0]?.location_city)
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
    let edu = eduData.map(edu => `${edu.degree};${edu.college}`).join(',')
    let exp = expData.map(edu => `${edu.playedFor};${edu.date};${edu.description}`).join(',')
    const updatedFormData = {
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
                <p>Sport</p>
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
                    {sport && (
                      <div>
                        <label htmlFor="subCategory">Select Category:</label><br />
                        <select name="subCategory" onChange={handleSubCategoryChange}>
                          <option value="">--Select Category--</option>
                          {subCategoryOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                        {selectedCategories.length > 0 && (
                          <div>
                            {Object.keys(subSubCategories).map((category, index) => (
                              <div key={index} id={category}>
                                <label>{category} Options:</label><br />
                                {subSubCategories[category].map((option) => (
                                  <label key={option}>
                                    <input type="checkbox" name={`${category}[]`} value={option} /> {option}
                                  </label>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                        {subCategoryOptions.length > 0 && (
                          <button type="button" onClick={handleAddCategory}>Add Another Category</button>
                        )}
                      </div>
                    )}
                  </div>
                </>
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
                        {sport && (
                          <div>
                            <label htmlFor="subCategory">Select Category:</label><br />
                            <select name="subCategory" onChange={handleSubCategoryChange} id='subCatdown'>
                              <option value="">--Select Category--</option>
                              {subCategoryOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                            {selectedCategories.length > 0 && (
                              <div>
                                {Object.keys(subSubCategories).map((category, index) => (
                                  <div key={index} id={category}>
                                    <label>{category} Options:</label><br />
                                    {subSubCategories[category].map((option) => (
                                      <label key={option} id="sportOptions">
                                        <input type="checkbox" name={`${category}[]`} value={option} /> {option}
                                      </label>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            )}
                            {/* {subCategoryOptions.length > 0 && (
                              <button type="button" onClick={handleAddCategory}>Add Another Category</button>
                            )} */}
                          </div>
                        )}
                      </div>
                    </>
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
              </div>
            </div>
          </div>
          <div className="detailsBox">
            <p className="detailHead">ADDITIONAL INFORMATION</p>
            <div className="detailsContent">
              <div className="detailsLeftContainer3">
                <p>Awards</p>
                <p>Skills</p>
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
