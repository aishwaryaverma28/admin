import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ACADEMY_LOGS, getDecryptedToken } from '../utils/Constants'

const AcademyLogs = (id) => {
    const decryptedToken = getDecryptedToken();
    const [logs, setLogs] = useState(null);

    const getLogs = () => {
        const body = {
            entity: id?.type,
            object_id: id?.id
        }
        axios.post(ACADEMY_LOGS, body, {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        })
            .then((response) => {
                if (response?.data?.status === 1) {
                    setLogs(response?.data?.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getLogs();
    }, [])
    return (
        <>
            {logs?.length > 0 && (
                <div className="savedNotes logsHeight">
                    <table>
                        <thead>
                            <tr>
                                <th className="common-fonts">ID</th>
                                <th className="common-fonts">Attr2</th>
                                <th className="common-fonts">Attr3</th>
                                <th className="common-fonts">Attr4</th>
                                <th className="common-fonts">Attr5</th>
                                <th className="common-fonts">Attr6</th>
                                <th className="common-fonts">Attr7</th>
                                <th className="common-fonts">Date</th>
                            </tr>
                        </thead>
                        {logs?.map((note) => (
                            <tr key={note?.id}>
                                <td className="common-fonts">{note.id}</td>
                                <td className="common-fonts">
                                    {note?.attr2}
                                </td>
                                <td className="common-fonts">{note?.attr3}</td>
                                <td className="common-fonts">{note?.attr4}</td>
                                <td className="common-fonts">{note?.attr5}</td>
                                <td className="common-fonts">{note?.attr6}</td>
                                <td className="common-fonts">{note?.attr7}</td>
                                <td className="common-fonts">
                                    {note?.creation_date &&
                                        note?.creation_date?.includes("T") &&
                                        note?.creation_date?.includes(".")
                                        ? note?.creation_date?.split("T")[0] +
                                        " at " +
                                        note?.creation_date?.split("T")[1]?.split(".")[0]
                                        : "-"}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            )}
        </>
    )
}

export default AcademyLogs