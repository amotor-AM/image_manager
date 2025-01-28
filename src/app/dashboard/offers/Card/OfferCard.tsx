import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Edit, Trash2} from "lucide-react";
import Image from "next/image";

interface OfferCardProps {
    offer: {
        id: string;
        title: string;
        imageUrl: string;
        description: string;
    }
    onEdit: () => void
  onDelete: () => void
}

function OfferCard({offer, onEdit, onDelete}: OfferCardProps) {
    let description = offer.description.length > 40 ? offer.description.substring(0, 37) + "..." : offer.description;
    return (
        <Card className="overflow-hidden">
            <Image src={offer.imageUrl} alt={offer.title} loading="lazy" className="w-full h-48 object-cover" height={192} width={384}/>
            <CardContent className="p-4">
                <h2 className="text-xl font-semibold mb-2">{offer.title}</h2>
                <p className="text-sm text-gray-600">{description}</p>
            </CardContent>
            <CardFooter className="p-4 flex justify-end gap-3">
                <Button variant="outline" onClick={onEdit}>
                    <Edit className="mr-2 h-4 w-4"/> Edit
                </Button>
                <Button variant="destructive" onClick={onDelete}>
                    <Trash2 className="mr-2 h-4 w-4"/> Delete
                </Button>

            </CardFooter>
        </Card>
    )
}

export default OfferCard;
