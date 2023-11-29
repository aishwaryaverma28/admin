import React, { useState, useEffect, useRef } from 'react'
import {
    getDecryptedToken,
} from "../../utils/Constants";
import "../../styles/Tournament.css"
import PlacesAutocomplete from "react-places-autocomplete";
import { toast, ToastContainer } from "react-toastify";
const AddTournament = () => {
    const decryptedToken = getDecryptedToken();
    const fileInputRef = useRef(null);
    const [photoUrls, setPhotoUrls] = useState([]);
    const [fileName, setFileName] = useState("");
    const [isUploadingMulti, setIsUploadingMulti] = useState(false);
    const [alertShown, setAlertShown] = useState(false);
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const [alertVideoShown, setAlertVideoShown] = useState(false);
    const [stateBtn, setStateBtn] = useState(0);
    const [address, setAddress] = useState("");
    const [mapLink, setMapLink] = useState("");
    const [coordinate, setCoordinate] = useState("");
    const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        url: "",
        sport: "",
    });
//========================================================google address
    useEffect(() => {
        if (!googleScriptLoaded) {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAKKzPfrnhLHFG7xMO-snpRQ7ULl91iOQw&libraries=places&language=en&region=IN`;
            script.async = true;
            script.onload = () => setGoogleScriptLoaded(true);
            script.onerror = (error) =>
                console.error("Error loading Google Maps:", error);
            document.head.appendChild(script);

            return () => {
                document.head.removeChild(script);
            };
        }
    }, [googleScriptLoaded]);

    const handleSelect = (selectedAddress) => {
        setAddress(selectedAddress);
        setStateBtn(1);
        const placesService = new window.google.maps.places.PlacesService(
            document.createElement("div")
        );

        placesService.textSearch({ query: selectedAddress }, (results, status) => {
            if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                results.length > 0
            ) {
                const location = results[0].geometry.location;
                const selectedLatitude = location.lat();
                const selectedLongitude = location.lng();
                setCoordinate(`${selectedLatitude},${selectedLongitude}`);
            }
        });

        const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURI(
            selectedAddress
        )}`;
        setMapLink(mapLink);
    };
//==============================================================multiple image upload
const processImageName = (imageName) => {
    const nameParts = imageName.split(".");
    if (nameParts.length > 1) {
      const namePart = nameParts.slice(0, -1).join(".");
      const processedName = namePart.replace(/[^\w-]/g, "-");
      return `${processedName}.${nameParts[nameParts.length - 1]}`;
    } else {
      return imageName.replace(/[^\w-]/g, "-");
    }
  };
  const showAlertOnce = (message) => {
    if (!alertVideoShown) {
      alert(message);
      setAlertVideoShown(true);
    }
  };
const handleButtonClick = () => {
        fileInputRef.current.click();
        setAlertShown(false);
      };
      const handleFileChange = (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (!allowedImageTypes.includes(file.type)) {
            if (!alertShown) {
              alert("Please choose a valid image file.");
              setAlertShown(true);
            }
            return;
          }
          if (file.type.startsWith("image/")) {
            submitImage(file);
          }
        }
      };
      const submitImage = (file) => {
        setIsUploadingMulti(true);
        const selectedImage = file;
        if (selectedImage) {
          if (selectedImage.size > 2 * 1024 * 1024) {
            showAlertOnce(
              "Image size should be less than 2MB. Please choose a smaller image."
            );
            setIsUploadingMulti(false);
            return;
          }
          const folder = "bookmyplayer/league/";
          const imageNameWithoutExtension = selectedImage.name.replace(
            /\.[^/.]+$/,
            ""
          );
          const sanitizedImageName = imageNameWithoutExtension.replace(
            /[^\w-]/g,
            "-"
          );
          const uniqueFileName = `${folder}/${sanitizedImageName}`;
          const data = new FormData();
          data.append("file", selectedImage);
          data.append("upload_preset", "zbxquqvw");
          data.append("cloud_name", "cloud2cdn");
          data.append("public_id", uniqueFileName);
    
          fetch("https://api.cloudinary.com/v1_1/cloud2cdn/image/upload", {
            method: "post",
            body: data,
          })
            .then((res) => res.json())
            .then((data) => {
              setFileName(processImageName(selectedImage.name));
              const imageUrl = processImageName(selectedImage.name);
              if (data.secure_url) {
                photoUrls.push(imageUrl);
                setPhotoUrls(photoUrls);
                setStateBtn(1);
              }
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              setIsUploadingMulti(false);
            });
        }
      };

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => {
            return { ...prev, [name]: value };
        });
        setStateBtn(1);
    }

    const onSave = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <header className="headerEditor">
                <p className="common-fonts add-new-blog"> Add a new Tournament</p>
            </header>
            <div className="helpContainer">
                <div className="helpBody">
                    <div>
                        <p className="helpTitle">Tournament Title<span className="common-fonts redAlert"> *</span></p>
                        <input
                            type="text"
                            placeholder="Enter Tournament Title"
                            name="title"
                            value={formData.name}
                            onChange={handleChange}
                        ></input>
                    </div>
                    <p className="helpTitle">Tournament Introduction<span className="common-fonts redAlert"> *</span></p>
                    <textarea
                        name="details"
                        type="textarea"
                        rows="5"
                        cols="5"
                        placeholder="Enter Tournament Introduction"
                        value={formData.details}
                        onChange={handleChange}
                    ></textarea>
                    <div className="tour_new_file bmp-gap">
                        <div className="contact-browse deal-doc-file tour_upload">
                            <span
                                className="common-fonts common-input contact-tab-input tour-border"
                                style={{
                                    position: "relative",
                                }}
                            >
                                <button
                                    className="contact-browse-btn common-fonts"
                                    onClick={handleButtonClick}
                                >
                                    Browse
                                </button>
                                <input
                                    type="file"
                                    style={{
                                        display: "none",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        bottom: 0,
                                        right: 0,
                                        width: "100%",
                                    }}
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    multiple
                                />
                                {isUploadingMulti ? (
                                    <span className="common-fonts upload-file-name">
                                        Uploading...
                                    </span>
                                ) : (
                                    <span className="common-fonts upload-file-name">
                                        <p className="common-fonts light-color">
                                            You can upload multiple images{" "}
                                        </p>
                                        <p className="common-fonts bmp-format">
                                            Upload image in format png, jpg, jpeg, webp{" "}
                                        </p>
                                        { }
                                    </span>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="helpRight tourHead">
                    <div className="tournamentRight">
                        <label htmlFor="" className="common-fonts bmp-academy-name tour_address">
                            Address
                        </label>
                        {googleScriptLoaded && (
                            <PlacesAutocomplete
                                value={address}
                                onChange={setAddress}
                                onSelect={handleSelect}
                                searchOptions={{
                                    componentRestrictions: { country: "IN" },
                                }}
                            >
                                {({
                                    getInputProps,
                                    suggestions,
                                    getSuggestionItemProps,
                                    loading,
                                }) => (
                                    <div className="relativeInput">
                                        <input
                                            type="text"
                                            className='tournamentInput tour_input'
                                            {...getInputProps({
                                                placeholder: "Enter your address",
                                            })}
                                        />
                                        <div
                                            {...(suggestions.length > 0
                                                ? { className: "autocomplete-dropdown" }
                                                : {})}
                                        >
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map((suggestion) => (
                                                <div
                                                    {...getSuggestionItemProps(suggestion)}
                                                    key={suggestion.placeId}
                                                >
                                                    {suggestion.description}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        )}
                    </div>
                    <div className="tournamentRight">
                        <p className="helpTitle">Tournament Title<span className="common-fonts redAlert"> *</span></p>
                        <input
                            type="text"
                            className='tournamentInput'
                            placeholder="Enter Tournament Title"
                            name="title"
                            value={formData.name}
                            onChange={handleChange}
                        ></input>
                    </div>
                </div>
            </div>
            <div className="help-bottom-btn">
                <button className="common-fonts common-delete-button">Cancel</button>
                <button
                    className="common-fonts common-save-button help-save"
                    onClick={onSave}
                >
                    Save
                </button>
            </div>

            <ToastContainer />
        </>
    )
}

export default AddTournament