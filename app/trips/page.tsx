import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservationDate";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  // if the user has no reservations
  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="It looks like you haven't reserved any trips"
        />
      </ClientOnly>
    );
  }

  //   if user has reservations
  return (
    <ClientOnly>
      <TripsClient
        // @ts-ignore
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default TripsPage;
