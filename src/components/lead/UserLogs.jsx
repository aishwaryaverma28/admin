import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { USER_LOG, getDecryptedToken } from '../utils/Constants';

const UserLogs = ( id ) => {
    const decryptedToken = getDecryptedToken();
    const [logs, setLogs] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    const getLogs = (pageNum) => {
        setIsLoading(true);
        const body = {
            object_type: id?.type,
            object_id: id?.id,
            page: pageNum,
            limit: 10,
            order: "id desc"
        };
        axios
            .post(USER_LOG, body, {
                headers: {
                    Authorization: `Bearer ${decryptedToken}`,
                },
            })
            .then((response) => {
                const newLogs = response?.data?.data;
                if (newLogs.length === 0) {
                    setHasMore(false);
                } else {
                    setLogs((prevLogs) => [...prevLogs, ...newLogs]);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (hasMore) {
            getLogs(page);
        }
    }, [page, hasMore]);

    const lastLogElementRef = useCallback((node) => {
        if (isLoading || !hasMore) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((prevPage) => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoading, hasMore]);

    return (
        <>
            {logs.length > 0 && (
                <div className="savedNotes logsHeight">
                    <table>
                        <thead>
                            <tr>
                                <th className="common-fonts">ID</th>
                                <th className="common-fonts">User Id</th>
                                <th className="common-fonts">Attr2</th>
                                <th className="common-fonts">Attr3</th>
                                <th className="common-fonts">Referred</th>
                                <th className="common-fonts">Attr5</th>
                                <th className="common-fonts">Attr6</th>
                                <th className="common-fonts">Attr7</th>
                                <th className="common-fonts">OTP</th>
                                <th className="common-fonts">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((note, index) => (
                                <tr
                                    key={note.id}
                                    ref={logs.length === index + 1 ? lastLogElementRef : null}
                                >
                                    <td className="common-fonts">{note.id}</td>
                                    <td className="common-fonts">{note?.attr1}</td>
                                    <td className="common-fonts">{note?.attr2}</td>
                                    <td className="common-fonts">{note?.attr3}</td>
                                    <td className="common-fonts">{note?.attr4}</td>
                                    <td className="common-fonts">{note?.attr5}</td>
                                    <td className="common-fonts">{note?.attr6}</td>
                                    <td className="common-fonts">{note?.attr7}</td>
                                    <td className="common-fonts">{note?.attr8}</td>
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
                        </tbody>
                    </table>
                </div>
            )}
            {isLoading && <p>Loading...</p>}
            {!hasMore && <p>No more data available</p>}
        </>
    );
};

export default UserLogs;
