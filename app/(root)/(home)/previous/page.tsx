import CallList from "@/components/shared/CallList";

const Previous = () => {
    return (
        <section className="flex flex-col size-full gap-10 text-white">
            <h1 className="text-3xl font-bold">Previous</h1>
            <CallList type="ended" />
        </section>
    );
};

export default Previous;
