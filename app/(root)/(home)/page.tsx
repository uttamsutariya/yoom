import DateTime from "@/components/shared/DateTime";
import MeetingTypeList from "@/components/shared/MeetingTypeList";

const Home = () => {
    return (
        <section className="flex flex-col size-full gap-10 text-white">
            <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
                <div className="flex flex-col h-full justify-between max-md:px-5 max-md:py-8 lg:p-11">
                    <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-semibold">Upcoming Meeting at 12:30 PM</h2>
                    <div className="flex flex-col gap-2">
                        <DateTime />
                    </div>
                </div>
            </div>
            <MeetingTypeList />
        </section>
    );
};

export default Home;
