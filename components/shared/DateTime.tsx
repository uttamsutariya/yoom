"use client";

import { useEffect, useMemo, useState } from "react";

const DateTime = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const time = useMemo(() => {
        return now.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    }, [now]);

    const date = useMemo(() => {
        return new Intl.DateTimeFormat("en-US", {
            dateStyle: "full",
        }).format(now);
    }, [now]);

    return (
        <>
            <h1 className="text-4xl lg:text-7xl font-extrabold">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
        </>
    );
};

export default DateTime;
