'use client'
import { useState } from 'react';
import OfferCard from './Card/OfferCard';
import EditOfferModal from './Card/EditOffer';
import DeleteConfirmationModal from './Card/DeleteConfirmation';

interface Offer {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    startDate?: Date;
    endDate?: Date;
    link: string;
}

const mockOffers: Offer[] = [
    {
        id: '1',
        title: 'Summer Sale',
        imageUrl: 'https://c8.alamy.com/comp/JEKNE3/summer-sale-written-on-yellow-sign-blue-wooden-planks-seashells-beach-JEKNE3.jpg',
        description: '20% off on all Bookings in the summer months',
        link: 'https://www.google.com'
    },
    {
        id: '2',
        title: 'New Arrivals',
        imageUrl: 'https://media.istockphoto.com/id/1366258243/vector/vector-illustration-new-arrival-label-modern-web-banner-on-yellow-background.jpg?s=612x612&w=0&k=20&c=ddLMrtth5QRoW-jJe8_ozTWmvRejIFlq3cv4BAIq_HQ=',
        description: 'Check out our latest products exclusively in our ecommerce store',
        link: 'https://www.google.com'
    },
    {
        id: '3',
        title: 'Clearance',
        imageUrl: 'https://t4.ftcdn.net/jpg/05/11/90/91/360_F_511909115_uOSsz8eLuCAnAJpEBe9CMj3mWwVLD6fU.jpg',
        description: 'Up to 50% off on clearance items',
        link: 'https://www.google.com'
    },
    {
        id: '4',
        title: 'Doggo',
        imageUrl: 'https://hoschtonanimalhospital.com/wp-content/uploads/sites/232/2022/07/photo-1546527868-ccb7ee7dfa6a-1024x683-1.jpg',
        description: 'He is just the best little dog',
        link: 'https://www.google.com',
        startDate: new Date(),
        endDate: new Date()
    }
]

function OffersPage() {
    const [offers, setOffers] = useState<Offer[]>(mockOffers);
    const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
    const [deletingOfferId, setDeletingOfferId] = useState<string | null>(null);

    // create a useEffect to fetch the offers from the database

    const handleEdit = (offer: Offer) => {
        setEditingOffer(offer);
    }

    const handleDelete = (offerId: string) => {
        setDeletingOfferId(offerId);
    }

    // update this to delete the offer from the database
    const confirmDelete = () => {
        if(deletingOfferId) {
            setOffers(offers.filter(offer => offer.id !== deletingOfferId));
            setDeletingOfferId(null);
        }
    }

    const cancelDelete = () => {
        setDeletingOfferId(null);
    }

    // update this to save the updated offer to the database
    const saveOffer = (updatedOffer: Offer) => {
        if(editingOffer) {
            setOffers(offers.map(offer => offer.id === editingOffer.id ? updatedOffer : offer));
            setEditingOffer(null);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-center items-center mb-6">
                <h1 className="text-2xl font-bold">Active Offers</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    offers.map((offer) => (
                        <OfferCard
                        key={offer.id}
                        offer={offer}
                        onEdit={() => handleEdit(offer)}
                        onDelete={() => handleDelete(offer.id)}
                        />
                    ))
                }
            </div>
            {editingOffer && <EditOfferModal offer={editingOffer} onSave={saveOffer} onClose={() => setEditingOffer(null)} />}
            {deletingOfferId && <DeleteConfirmationModal onConfirm={confirmDelete} onCancel={cancelDelete} />}
        </div>
    )

}

export default OffersPage;