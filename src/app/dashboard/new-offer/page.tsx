"use client"
import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { Badge } from "@/components/ui/badge";

interface NewOfferPageProps {
    onSave: (offer: any) => void;
}

interface Offer {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
    startDate?: Date;
    endDate?: Date;
    categories: string[];
}

function NewOfferPage() {
    const [offer, setOffer] = useState<Offer>({
        title: "",
        description: "",
        imageUrl: "",
        link: "",
        categories: [],
    })
    const [newCategory, setNewCategory] = useState("")
    const [startDateOpen, setStartDateOpen] = useState(false)
    const [endDateOpen, setEndDateOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setOffer({ ...offer, [name]: value });
    }

    const handleFileChange = (files: File[]) => {
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setOffer({ ...offer, imageUrl: reader.result as string });
            }
            reader.readAsDataURL(file);
        }
    }

    // use PST by default. Create the helper util function
    const handleDateChange = (name: 'startDate' | 'endDate', date: Date | undefined, close: () => void) => {
        if (date) {
            setOffer({ ...offer, [name]: date });
            close();
        }
    }

    const handleAddCategory = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newCategory.trim() !== '') {
            e.preventDefault();
            // check if the category already exists
            if (!offer.categories.includes(newCategory.trim())) {
                setOffer({
                    ...offer,
                    categories: [...offer.categories, newCategory.trim()]
                })
            }
            setNewCategory('');
        }
    }

    const handleRemoveCategory = (category: string) => {
        setOffer((prev) => ({
            ...prev,
            categories: prev.categories.filter((item) => item !== category)
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(offer)
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-center items-center mb-10">
                <div className="w-full text-center">
                    <h1 className="text-2xl font-bold">Create New Offer</h1>
                    <p className="text-md">Fields marked with <span className="text-red-500">*</span> are required</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="w-full lg:w-1/3 space-y-4">
                        <div>
                            <label htmlFor="image" className="md-2 block">
                                Image <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <div className="border border-dashed border-gray-300 rounded-md">
                            <FileUpload onChange={handleFileChange} />
                        </div>

                        {offer.imageUrl && (
                            <div className="mt-4">
                                <img
                                    src={offer.imageUrl || "/placeholder.svg"}
                                    alt="Offer preview"
                                    className="w-full h-auto rounded-md"
                                />
                            </div>
                        )}
                    </div>
                    <div className="w-full lg:w-2/3 space-y-4">
                        <div>
                            <Label htmlFor="title" className="md-2 block mt-1">
                                Title <span className="text-red-500">*</span>
                            </Label>
                            <Input id="title" name="title" value={offer.title} onChange={handleChange} className="w-full mt-5" />
                        </div>
                        <div>
                            <Label htmlFor="description" className="mb-2 block">
                                Description <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={offer.description}
                                onChange={handleChange}
                                className="w-full mt-5"
                            />
                        </div>
                        <div>
                            <Label htmlFor="link" className="mb-2 block">
                                Offer Link <span className="text-red-500">*</span>
                            </Label>
                            <Input id="link" name="link" value={offer.link} onChange={handleChange} className="w-full mt-5" />
                        </div>
                        <div>
                            <Label htmlFor="categories" className="mb-2 block">
                                Categories
                            </Label>
                            <Input
                                id="categories"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                onKeyDown={handleAddCategory}
                                placeholder="Type a category and press Enter"
                                className="w-full mt-5"
                            />
                            <div className="mt-2 flex flex-wrap gap-2 h-10">
                                {offer.categories.map((category) => (
                                    <Badge key={category} variant="secondary" className="text-sm">
                                        {category}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="ml-1 h-4 w-4 p-0"
                                            onClick={() => handleRemoveCategory(category)}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <div className="flex-1">
                                <Label className="mb-5 block">Start Date</Label>
                                <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !offer.startDate && "text-muted-foreground",
                                            )}
                                        >
                                            {offer.startDate ? dayjs(offer.startDate).format("MMMM D, YYYY") : <span>Pick a start date</span>}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={offer.startDate}
                                            onSelect={(date) => handleDateChange("startDate", date, () => setStartDateOpen(false))}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex-1">
                                <Label className="mb-5 block">End Date</Label>
                                <Popover open={endDateOpen} onOpenChange={setEndDateOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !offer.endDate && "text-muted-foreground",
                                            )}
                                        >
                                            {offer.endDate ? dayjs(offer.endDate).format("MMMM D, YYYY") : <span>Pick an end date</span>}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={offer.endDate}
                                            onSelect={(date) => handleDateChange("endDate", date, () => setEndDateOpen(false))}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className="mt-6"></div>
                        <Button type="submit" className="w-full mt-6">
                            Save Offer
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewOfferPage;