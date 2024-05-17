import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  // if the user has no properties
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="It looks like you have no properties"
        />
      </ClientOnly>
    );
  }

  //   if user has properties
  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
