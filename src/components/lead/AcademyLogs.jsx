import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ACADEMY_LOGS, getDecryptedToken } from '../utils/Constants'

const AcademyLogs = (item) => {
    const decryptedToken = getDecryptedToken();
    const [logs, setLogs] = useState(null);

    const getLogs = () => {
        const body = {
            entity: "Academy",
            object_id: item?.item?.id
        }
        axios.post(ACADEMY_LOGS, body, {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        })
            .then((response) => {
                console.log(response?.data?.data);
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
                    {logs?.map((note) => (
                        <>
                            <section key={note?.id} className="note-display newSectionCss">
                                <div className="notes-date logDivs">
                                    <p><span className='logHeading'>Id: </span>{note?.id}</p>
                                    <p>
                                        {note?.creation_date &&
                                            note?.creation_date?.includes("T") &&
                                            note?.creation_date?.includes(".")
                                            ? note?.creation_date?.split("T")[0] +
                                            " at " +
                                            note?.creation_date?.split("T")[1]?.split(".")[0]
                                            : "-"}
                                    </p>
                                </div>
                                <div className="notes-date logDivs">
                                    <p>{note?.attr2}</p>
                                    <p><span className='logHeading'>attr5: </span>{note?.attr5}</p>
                                    <p><span className='logHeading'>attr6: </span>{note?.attr6}</p>
                                </div>
                                <div className="notes-date">
                                    {note.attr3}
                                </div>
                            </section>
                        </>))}
                </div>
            )}
        </>
    )
}

export default AcademyLogs