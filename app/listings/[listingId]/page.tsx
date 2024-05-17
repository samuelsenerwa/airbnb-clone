import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservationDate";
import EmptyState from "@/app/components/EmptyState";

interface Iparams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: Iparams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
