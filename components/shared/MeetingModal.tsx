import { ReactNode } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    loadingTitle: string;
    className?: string;
    children?: ReactNode;
    handleClick?: () => void;
    buttonText?: string;
    image?: string;
    buttonIcon?: string;
    loading: boolean;
}

const MeetingModal = ({ isOpen, onClose, title, loadingTitle, buttonIcon, buttonText, children, className, handleClick, image, loading }: MeetingModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
                <div className="flex flex-col gap-6">
                    {image && (
                        <div className="flex justify-center">
                            <Image src={image} alt="image" width={72} height={72} />
                        </div>
                    )}
                    <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>{title}</h1>
                    {children}
                    <Button className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed" onClick={handleClick} disabled={loading}>
                        {buttonIcon && <Image src={buttonIcon} alt="buttonIcon" width={13} height={13} />}
                        &nbsp;
                        {loading ? loadingTitle : buttonText || "Schedule Meeting"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MeetingModal;
