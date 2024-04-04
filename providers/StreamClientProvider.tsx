"use client";

import { ReactNode, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { tokenProvider } from "@/actions/stream.actions";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import Loader from "@/components/shared/Loader";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (!isLoaded || !user) return;
        if (!apiKey) throw new Error("Stream API Key Missing");

        const client = new StreamVideoClient({
            user: {
                id: user?.id,
                name: user?.username || user?.id,
                image: user?.imageUrl,
            },
            apiKey: apiKey,
            tokenProvider: tokenProvider,
        });

        setVideoClient(client);
    }, [user, isLoaded]);

    const [videoClient, setVideoClient] = useState<StreamVideoClient>();

    if (!videoClient) return <Loader />;

    return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
