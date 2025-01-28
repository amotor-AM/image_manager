import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

interface EditOfferModalProps {
    offer: {
        id: string;
        title: string;
        imageUrl: string;
        description: string;
        link: string;
        startDate?: Date;
        endDate?: Date;
    }
    onSave: (offer: {
        id: string;
        title: string;
        imageUrl: string;
        description: string;
        link: string;
        startDate?: Date;
        endDate?: Date;
    }) => void;
    onClose: () => void;
}

function EditOfferModal({ offer, onSave, onClose }: EditOfferModalProps) {
    const [editedOffer, setEditedOffer] = useState({ ...offer });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        setEditedOffer({ ...editedOffer, [name]: value });
    }

    const handleFileChange = (files: File[]) => {
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedOffer({ ...editedOffer, imageUrl: reader.result as string });
            }
            reader.readAsDataURL(file);
        }
    }

    const handleDateChange = (name: 'startDate' | 'endDate', date: Date | undefined) => {
        console.log('date', date)
        if (date) {
            setEditedOffer({ ...editedOffer, [name]: date });
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedOffer);
    }

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[450px]">
                <DialogHeader className="flex justify-center items-center">
                    <DialogTitle className="text-2xl font-bold">Edit Offer</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="image">Image</Label>
                        <div className="border border-dashed border-gray-300 rounded-md">
                            <FileUpload onChange={handleFileChange} />
                        </div>
                    </div>
                    <div className="flex flex-row space-x-4">
                        <div className="flex-1">
                            <Label>Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !editedOffer.startDate && "text-muted-foreground",
                                        )}
                                    >
                                        {editedOffer.startDate ? (
                                            dayjs(editedOffer.startDate).format("MMMM D, YYYY")
                                        ) : (
                                            <span>Pick a start date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={editedOffer.startDate}
                                        onSelect={(date) => handleDateChange("startDate", date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="flex-1">
                            <Label>End Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !editedOffer.endDate && "text-muted-foreground",
                                        )}
                                    >
                                        {editedOffer.endDate ? (
                                            dayjs(editedOffer.endDate).format("MMMM D, YYYY")
                                        ) : (
                                            <span>Pick an end date</span>
                                        )}
                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={editedOffer.endDate}
                                        onSelect={(date) => handleDateChange("endDate", date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" name="title" value={editedOffer.title} onChange={handleChange} className="w-full" />
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={editedOffer.description}
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Label htmlFor="link">Offer Link</Label>
                        <Input id="link" name="link" value={editedOffer.link} onChange={handleChange} className="w-full" />
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )

}

export default EditOfferModal;


