"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "../ui/textarea";
import HomeCard from "./HomeCard";
import MeetingModal from "./MeetingModal";
import ReactDatePicker from "react-datepicker";

const MeetingTypeList = () => {
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<"isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined>(undefined);
    const [callDetails, setCallDetails] = useState<Call>();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: "",
        link: "",
    });
    const [loading, setLoading] = useState(false);

    const { toast } = useToast();
    const { user } = useUser();
    const client = useStreamVideoClient();

    const createMeeting = async () => {
        if (!client || !user) return;

        try {
            if (!values.dateTime) {
                toast({ title: "Please select a date and time" });
                return;
            }

            setLoading(true);
            const id = crypto.randomUUID();
            const call = client.call("default", id);

            if (!call) {
                setLoading(false);
                throw new Error("Falied to create a call");
            }

            const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "Instant meeting";

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                },
            });

            setCallDetails(call);

            if (!values.description) {
                setLoading(false);
                router.push(`/meeting/${call.id}`);
            }

            toast({ title: "Meeting Created" });
        } catch (error) {
            setLoading(false);
            console.log(error);
            toast({ title: "Failed to create a meeting" });
        }
    };

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

    return (
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <HomeCard img="/icons/add-meeting.svg" title="New Meeting" description="Start an instant meeting" handleClick={() => setMeetingState("isInstantMeeting")} />
            <HomeCard
                img="/icons/join-meeting.svg"
                title="Join Meeting"
                description="via invitation link"
                className="bg-blue-1"
                handleClick={() => setMeetingState("isJoiningMeeting")}
            />
            <HomeCard
                img="/icons/schedule.svg"
                title="Schedule Meeting"
                description="Plan your meeting"
                className="bg-purple-1"
                handleClick={() => setMeetingState("isScheduleMeeting")}
            />
            <HomeCard img="/icons/recordings.svg" title="View Recordings" description="Meeting Recordings" className="bg-yellow-1" handleClick={() => router.push("/recordings")} />

            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === "isScheduleMeeting"}
                    onClose={() => setMeetingState(undefined)}
                    title="Create Meeting"
                    loadingTitle="Creating your meeting..."
                    handleClick={createMeeting}
                    loading={loading}
                    className="text-center"
                >
                    <div className="flex flex-col gap-2.5">
                        <label className="text-base text-normal leading-[22px] text-sky-2">Add a description</label>
                        <Textarea
                            onChange={(e) => setValues({ ...values, description: e.target.value })}
                            className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                        <label className="text-base text-normal leading-[22px] text-sky-2">Select date and time</label>
                        <ReactDatePicker
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat={"MMMM d, yyyy h:mm aa"}
                            className="w-full rounded bg-dark-3 p-2 focus:outline-none"
                            selected={values.dateTime}
                            onChange={(date) => setValues({ ...values, dateTime: date! })}
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === "isScheduleMeeting"}
                    onClose={() => {
                        setMeetingState(undefined);
                        setCallDetails(undefined);
                        setLoading(false);
                    }}
                    title="Meeting Created"
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast({ title: "Link copied" });
                    }}
                    image="/icons/checked.svg"
                    buttonIcon="/icons/copy.svg"
                    buttonText="Copy Meeting Link"
                    className="text-center"
                />
            )}

            <MeetingModal
                isOpen={meetingState === "isInstantMeeting"}
                onClose={() => setMeetingState(undefined)}
                title="Start instant meeting"
                loadingTitle="Starting your meeting..."
                className="text-center"
                buttonText="Start instant meeting"
                handleClick={createMeeting}
                loading={loading}
            />
        </section>
    );
};

export default MeetingTypeList;
