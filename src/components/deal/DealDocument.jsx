import React, { useEffect, useState, useRef } from "react";
import Device from "../../assets/image/device.svg";
import Cloud from "../../assets/image/cloud.svg";
import DealDocPreview from "./DealDocPreview.jsx";
import axios from "axios";
import {
  ENVELOPE_TOKEN, //get api
  SEND_ENVELOPE, //post api
  ENVELOPE_DETAILS, //get api with body
  UPDATE_DEAL,
  handleLogout,
  getDecryptedToken,
} from "../utils/Constants";

const DealDocument = ({ dealId, email }) => {
  const decryptedToken = getDecryptedToken();
  const [actionopen, setActionOpen] = useState(false);
  const [actionopen2, setActionOpen2] = useState(false);
  const [preview, setPreview] = useState(false);
  const actionDropDownRef = useRef(null);
  const actionDropDownRef2 = useRef(null);
  const [envToken, setEnvToken] = useState("");
  const [fileView, setFileView] = useState(null);
  const fileInputRef = useRef(null);

  const toggleActionDropdown = () => {
    setActionOpen(!actionopen);
  };
  const toggleActionDropdown2 = () => {
    setActionOpen2(!actionopen2);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        actionDropDownRef.current &&
        !actionDropDownRef.current.contains(event.target)
      ) {
        setActionOpen(false);
      }
    };
    const handleOutsideClick2 = (event) => {
      if (
        actionDropDownRef2.current &&
        !actionDropDownRef2.current.contains(event.target)
      ) {
        setActionOpen2(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("click", handleOutsideClick2);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("click", handleOutsideClick2);
    };
  }, []);


  const handlePreviewClose = () => {
    setPreview(false);
  };

  //======================================================DOCUSIGN APIS CODE
  const getEnvelopeToken = () => {
    axios
      .get(ENVELOPE_TOKEN)
      .then((response) => {
        console.log(response?.data?.data?.access_token);
        setEnvToken(response?.data?.data?.access_token);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getEnvelopeToken();
  }, []);
  //   {POST API BODY
  //     "dealId": 12,
  //     "recipatant": [
  //         {
  //             "email": "maheshmhaske241198@gmail.com",
  //             "name": "Mahesh",
  //             "recipientId": "3"
  //         }
  //     ],
  //     "bearerToken": "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQsAAAABAAUABwAA1M2vkcnbSAgAABTxvdTJ20gCADYV3rL58-xDiLmUHeKwuXAVAAEAAAAYAAEAAAAFAAAADQAkAAAANzYwMTk4ZTktYzIzMS00MmNlLWEyODMtYWFmZWZiMzIxZTUzIgAkAAAANzYwMTk4ZTktYzIzMS00MmNlLWEyODMtYWFmZWZiMzIxZTUzMAAACjVUQ7PbSDcAgkiZkDF9NUmIa0Hhp06GBxIAAQAAAA0AAAByZWZyZXNoX3Rva2Vu.DY_x07zSVT4D3_Kg68Kr6_NgkUjdKpdPgCFCYWQi5NshWkn1dQhNbCf2nws4fOdfnBH1SBzlw6nFbMqSWUabi1DjSOVR4N9afcNcyheHwUgG31eqi4mx-lPOnKVwKyo3dALX3dbxnf6GR1YppvH-cd-JWe4cGeOTubUZtfWUgSK0beiKwnQdQg9NflyopNRdKpXpEw_FyRfH4sKG5f2NdcWqFyaxFCxS8TEGUUSerFmmd5kaooZlK5K5LtZuyJi-qDKUY1iGAaFJM9twDGUTGxllTOzEOyrv9gz0YsJzE3WcE7JoMYlWl1fkps8P-wVW6kkqQ5aaZc5zraU6RFGW3w",
  //     "DocBase64": "JVBERi0xLjMNCiXi48/TDQoNCjEgMCBvYmoNCjw8DQovVHlwZSAvQ2F0YWxvZw0KL091dGxpbmVzIDIgMCBSDQovUGFnZXMgMyAwIFINCj4+DQplbmRvYmoNCg0KMiAwIG9iag0KPDwNCi9UeXBlIC9PdXRsaW5lcw0KL0NvdW50IDANCj4+DQplbmRvYmoNCg0KMyAwIG9iag0KPDwNCi9UeXBlIC9QYWdlcw0KL0NvdW50IDINCi9LaWRzIFsgNCAwIFIgNiAwIFIgXSANCj4+DQplbmRvYmoNCg0KNCAwIG9iag0KPDwNCi9UeXBlIC9QYWdlDQovUGFyZW50IDMgMCBSDQovUmVzb3VyY2VzIDw8DQovRm9udCA8PA0KL0YxIDkgMCBSIA0KPj4NCi9Qcm9jU2V0IDggMCBSDQo+Pg0KL01lZGlhQm94IFswIDAgNjEyLjAwMDAgNzkyLjAwMDBdDQovQ29udGVudHMgNSAwIFINCj4+DQplbmRvYmoNCg0KNSAwIG9iag0KPDwgL0xlbmd0aCAxMDc0ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBBIFNpbXBsZSBQREYgRmlsZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIFRoaXMgaXMgYSBzbWFsbCBkZW1vbnN0cmF0aW9uIC5wZGYgZmlsZSAtICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjY0LjcwNDAgVGQNCigganVzdCBmb3IgdXNlIGluIHRoZSBWaXJ0dWFsIE1lY2hhbmljcyB0dXRvcmlhbHMuIE1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NTIuNzUyMCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDYyOC44NDgwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjE2Ljg5NjAgVGQNCiggdGV4dC4gQW5kIG1vcmUgdGV4dC4gQm9yaW5nLCB6enp6ei4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNjA0Ljk0NDAgVGQNCiggbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDU5Mi45OTIwIFRkDQooIEFuZCBtb3JlIHRleHQuIEFuZCBtb3JlIHRleHQuICkgVGoNCkVUDQpCVA0KL0YxIDAwMTAgVGYNCjY5LjI1MDAgNTY5LjA4ODAgVGQNCiggQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA1NTcuMTM2MCBUZA0KKCB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBFdmVuIG1vcmUuIENvbnRpbnVlZCBvbiBwYWdlIDIgLi4uKSBUag0KRVQNCmVuZHN0cmVhbQ0KZW5kb2JqDQoNCjYgMCBvYmoNCjw8DQovVHlwZSAvUGFnZQ0KL1BhcmVudCAzIDAgUg0KL1Jlc291cmNlcyA8PA0KL0ZvbnQgPDwNCi9GMSA5IDAgUiANCj4+DQovUHJvY1NldCA4IDAgUg0KPj4NCi9NZWRpYUJveCBbMCAwIDYxMi4wMDAwIDc5Mi4wMDAwXQ0KL0NvbnRlbnRzIDcgMCBSDQo+Pg0KZW5kb2JqDQoNCjcgMCBvYmoNCjw8IC9MZW5ndGggNjc2ID4+DQpzdHJlYW0NCjIgSg0KQlQNCjAgMCAwIHJnDQovRjEgMDAyNyBUZg0KNTcuMzc1MCA3MjIuMjgwMCBUZA0KKCBTaW1wbGUgUERGIEZpbGUgMiApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY4OC42MDgwIFRkDQooIC4uLmNvbnRpbnVlZCBmcm9tIHBhZ2UgMS4gWWV0IG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NzYuNjU2MCBUZA0KKCBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSB0ZXh0LiBBbmQgbW9yZSApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY2NC43MDQwIFRkDQooIHRleHQuIE9oLCBob3cgYm9yaW5nIHR5cGluZyB0aGlzIHN0dWZmLiBCdXQgbm90IGFzIGJvcmluZyBhcyB3YXRjaGluZyApIFRqDQpFVA0KQlQNCi9GMSAwMDEwIFRmDQo2OS4yNTAwIDY1Mi43NTIwIFRkDQooIHBhaW50IGRyeS4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gQW5kIG1vcmUgdGV4dC4gKSBUag0KRVQNCkJUDQovRjEgMDAxMCBUZg0KNjkuMjUwMCA2NDAuODAwMCBUZA0KKCBCb3JpbmcuICBNb3JlLCBhIGxpdHRsZSBtb3JlIHRleHQuIFRoZSBlbmQsIGFuZCBqdXN0IGFzIHdlbGwuICkgVGoNCkVUDQplbmRzdHJlYW0NCmVuZG9iag0KDQo4IDAgb2JqDQpbL1BERiAvVGV4dF0NCmVuZG9iag0KDQo5IDAgb2JqDQo8PA0KL1R5cGUgL0ZvbnQNCi9TdWJ0eXBlIC9UeXBlMQ0KL05hbWUgL0YxDQovQmFzZUZvbnQgL0hlbHZldGljYQ0KL0VuY29kaW5nIC9XaW5BbnNpRW5jb2RpbmcNCj4+DQplbmRvYmoNCg0KMTAgMCBvYmoNCjw8DQovQ3JlYXRvciAoUmF2ZSBcKGh0dHA6Ly93d3cubmV2cm9uYS5jb20vcmF2ZVwpKQ0KL1Byb2R1Y2VyIChOZXZyb25hIERlc2lnbnMpDQovQ3JlYXRpb25EYXRlIChEOjIwMDYwMzAxMDcyODI2KQ0KPj4NCmVuZG9iag0KDQp4cmVmDQowIDExDQowMDAwMDAwMDAwIDY1NTM1IGYNCjAwMDAwMDAwMTkgMDAwMDAgbg0KMDAwMDAwMDA5MyAwMDAwMCBuDQowMDAwMDAwMTQ3IDAwMDAwIG4NCjAwMDAwMDAyMjIgMDAwMDAgbg0KMDAwMDAwMDM5MCAwMDAwMCBuDQowMDAwMDAxNTIyIDAwMDAwIG4NCjAwMDAwMDE2OTAgMDAwMDAgbg0KMDAwMDAwMjQyMyAwMDAwMCBuDQowMDAwMDAyNDU2IDAwMDAwIG4NCjAwMDAwMDI1NzQgMDAwMDAgbg0KDQp0cmFpbGVyDQo8PA0KL1NpemUgMTENCi9Sb290IDEgMCBSDQovSW5mbyAxMCAwIFINCj4+DQoNCnN0YXJ0eHJlZg0KMjcxNA0KJSVFT0YNCg=="
  // }

  //   { GET API BODY
  //     "envelopId": "fca53720-11cf-4a30-b15a-8c906ae0a8b7",
  //     "bearerToken": "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCAA_CgirPbSAgAgEMTr82z20gCADYV3rL58-xDiLmUHeKwuXAVAAEAAAAYAAEAAAAFAAAADQAkAAAANzYwMTk4ZTktYzIzMS00MmNlLWEyODMtYWFmZWZiMzIxZTUzIgAkAAAANzYwMTk4ZTktYzIzMS00MmNlLWEyODMtYWFmZWZiMzIxZTUzMAAACjVUQ7PbSDcAgkiZkDF9NUmIa0Hhp06GBw.TQcTyE0aVgpRHoUpKFlB7aHKM9DGFhuLWLgWhlkZoZqoYrX9-IVfET2SdTz_JwB0p61-L6hr1NeFQ3D9tCn2lwmZQrkU3aG2xK272JxdWLNpdPwAKvd-92f7kWL9-eCuh5XDJhhiivEaqU6bJ2sNakwPOXVZyCCIQJaSFjSG7uDoh2TvVhI5wezMmNcM7GHnRMdPsqTj6pmid8GG6f7YzpK55PaMPnjeFm-e1K-KkYYz81BSi2EMwI3zXWeIo5P9kgkUlWWvmyDRrjQDAe8Qr1Cp50zksF1IqOOCtoFoq73H6ryaLqbffJmZNWba4UgOElq-IKhoXUsF4NuVVh3z_Q"
  // }
  const handleButtonClick = () => {
     fileInputRef.current.click();
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setFileView(file);
    if (file) {
      try {
        const base64Data = await convertToBase64(file);
        console.log(base64Data);
        // handleBrowseClick(base64Data);
        handlePreview(base64Data);
      } catch (error) {
        console.error("Error converting file to Base64:", error);
      }
    }
  };

  const handlePreview = async (base64Data) => {
    setPreview(true);
  };

  return (
    <div className="deal-doc-wrapper">
      <div className="colapedEditor deal-doc-container">
        <p>Click here to add document</p>
      </div>

      <div className="deal-doc-top">
        <div className="deal-doc-flex">
        <input
                type="file"
                style={{
                  display: "none",
                }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
          <img src={Device} alt="" />
          <p className="common-fonts"onClick={handleButtonClick}>Upload from the device</p>
        </div>
        <div className="doc-line"></div>

        <div className="doc-cloud-comp">
          <img src={Cloud} alt="" className="doc-cloud-img" />
          <p className="common-fonts doc-cloud">connect cloud storage</p>
        </div>
      </div>

      <div className="deal-doc-box">
        <div>
          <p className="comon-fonts deal-doc-sample">docusign sample file</p>
          <div className="deal-doc-status">
            <div className="deal-doc-sent">
              <p className="common-fonts">sent</p>
            </div>

            <p className="common-fonts deal-doc-completed">0/1 completed</p>
          </div>
        </div>

        <div className="select deal-doc-wrap">
          <div className="dropdown-container" ref={actionDropDownRef}>
            <div className="deal-doc-action" onClick={toggleActionDropdown}>
              Action
              <i
                className={`fa-sharp fa-solid fa-angle-down deal-doc-angle`}
              ></i>
            </div>
            {actionopen && (
              <div className="dropdown-menu deal-doc-menu">
                <ul>
                  <li onClick={handlePreview}>Preview document</li>
                  <li>Share as link</li>
                  <li>Download PDF</li>
                  <li>Delete</li>
                </ul>
              </div>
            )}
          </div>
          <div>
            <p className="common-fonts deal-doc-time">
              Created on Sept 13, 2023 at 10:00 AM GMT+5:30
            </p>
          </div>
        </div>
      </div>

      <div className="deal-doc-box">
        <div>
          <p className="comon-fonts deal-doc-sample">docusign sample file</p>
          <div className="deal-doc-status">
            <div className="deal-doc-comp">
              <p className="common-fonts">completed</p>
            </div>

            <p className="common-fonts deal-doc-completed">0/1 completed</p>
          </div>
        </div>

        <div className="select deal-doc-wrap">
          <div className="dropdown-container" ref={actionDropDownRef2}>
            <div className="deal-doc-action" onClick={toggleActionDropdown2}>
              Action
              <i
                className={`fa-sharp fa-solid fa-angle-down deal-doc-angle`}
              ></i>
            </div>
            {actionopen2 && (
              <div className="dropdown-menu deal-doc-menu">
                <ul>
                  <li onClick={handlePreview}>Preview document</li>
                  <li>Share as link</li>
                  <li>Download PDF</li>
                  <li>Delete</li>
                </ul>
              </div>
            )}
          </div>
          <div>
            <p className="common-fonts deal-doc-time">
              Created on Sept 13, 2023 at 10:00 AM GMT+5:30
            </p>
          </div>
        </div>
      </div>
      {preview && <DealDocPreview onClose={handlePreviewClose} fileView={fileView} />}
    </div>
  );
};

export default DealDocument;
