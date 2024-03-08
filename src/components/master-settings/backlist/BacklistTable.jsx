import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKLIST_DATA, getDecryptedToken } from '../../utils/Constants';

const BacklistTable = () => {
  const decryptedToken = getDecryptedToken();
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);

  const getList = () => {
    axios
      .get(BACKLIST_DATA, {
        headers: {
          Authorization: `Bearer ${decryptedToken}`,
        },
      })
      .then((response) => {
        console.log(response?.data?.data);
        setList(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getList();
  }, []);

  // Helper function to extract the link from anchor tag
  function extractLink(anchorTag) {
    const regex = /href=\"([^\"]*)\"/;
    const match = regex.exec(anchorTag);
    return match ? match[1] : '';
  }

  // Helper function to extract the text from anchor tag
  function extractText(anchorTag) {
    const regex = />([^<]*)</;
    const match = regex.exec(anchorTag);
    return match ? match[1] : '';
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="backlist_table">
        <table>
          <thead>
            <tr>
                <th className="common-fonts">Id</th>
              <th className="common-fonts">Link</th>
              <th className="common-fonts">Anchor Text</th>
              <th className="common-fonts">Count</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index}>
                <td className="common-fonts">{index+1}</td>
                <td className="common-fonts">
                  {extractLink(item.anchor_tag)}
                </td>
                <td className="common-fonts">{extractText(item.anchor_tag)}</td>
                <td className="common-fonts">{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default BacklistTable;
