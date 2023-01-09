import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FilterMenu from '../components/FilterMenu'
import Listings from '../components/Listing/Listings'
import { useMemo, useState,useEffect } from 'react'
import listingsData from '../data/airsol'
import AddListingModal from '../components/Listing/AddListingModal'
import EditListingModal from '../components/Listing/EditListingModal'
import { useWallet } from '@solana/wallet-adapter-react'
import ReserveListingModal from '../components/Listing/ReserveListingModal'
import { useAirsol } from '../hooks/useAirsol'


import { PublicKey } from "@solana/web3.js";



export default function Home() {


    const {initializeUser, airsols, bookings, transactionPending, addAirsol, updateAirsol, removeAirsol, bookAirsol, cancelBooking, initialized} = useAirsol()
// console.log(airsols, "👈")


    const { connected, publicKey } = useWallet()
    const [showReservedListing, setShowReservedListing] = useState(false)
    const [listings, setListings] = useState(listingsData)
    const [addListingModalOpen, setAddListingModalOpen] = useState(false)
    const [editListingModalOpen, setEditListingModalOpen] = useState(false)
    const [reserveListingModalOpen, setReserveListingModalOpen] = useState(false)
    const [currentEditListingID, setCurrentEditListingID] = useState(null)
    const [currentReserveListingID, setCurrentReserveListingID] = useState(null)
    const currentEditListing = useMemo(() => airsols.find((listing) => listing.account.idx === currentEditListingID), [currentEditListingID])
    const displayListings = useMemo(() => (showReservedListing ? bookings : airsols), [showReservedListing, airsols])

    const toggleShowReservedListing = () => {
        setShowReservedListing(!showReservedListing)
    }



    const toggleEditListingModal = (listingID) => {
        setCurrentEditListingID(listingID)

        setEditListingModalOpen(true)
    }


    const removeListing = (listingID) => {
        setListings(listings.filter((listing) => listing.id !== listingID))
    }

    const toggleReserveListingModal = (value, listingID) => {
        setCurrentEditListingID(listingID)

        setReserveListingModalOpen(value)
    }

    const reserveListing = ({location, country, price, image},range) => {
        console.log(location, country, price, image, "BETTT",range)
    }

    const unreserveListing = () => {

    }

    return (
        <div>
            <Head>
                <title>Airsol Clone</title>
            </Head>

            <Header connected={connected} publicKey={publicKey} initializeUser = {initializeUser} initialized = {initialized} transactionPending = {transactionPending}/>

            <main className="pt-10 pb-20">
                <FilterMenu />

                {connected && (
                    <div className="px-20 pb-10 flex justify-end space-x-4">
                        <button onClick={toggleShowReservedListing} className="border rounded-lg p-4 text-xs font-medium">
                            {showReservedListing ? 'Reserved' : 'All'}
                        </button>
                        <button onClick={() => setAddListingModalOpen(true)} className="border rounded-lg p-4 text-xs font-medium">
                            Add Listing
                        </button>
                    </div>
                )}
                    <Listings connected={connected} showReservedListing={showReservedListing} listings={displayListings} toggleEditListingModal={toggleEditListingModal} toggleReserveListingModal={toggleReserveListingModal} removeListing={removeAirsol} unreserveListing={cancelBooking} />

                <AddListingModal addAirsol={addAirsol} addListingModalOpen={addListingModalOpen} setAddListingModalOpen={setAddListingModalOpen} />
                <EditListingModal editListing={updateAirsol} currentEditListing={currentEditListing} editListingModalOpen={editListingModalOpen} setEditListingModalOpen={setEditListingModalOpen} />
                <ReserveListingModal reserveListing={bookAirsol} currentEditListing={currentEditListing} reserveListingModalOpen={reserveListingModalOpen} setReserveListingModalOpen={setReserveListingModalOpen} />
            </main>

            <Footer />
        </div>
    )
}
