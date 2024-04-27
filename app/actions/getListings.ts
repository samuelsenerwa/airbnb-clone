import prisma from "@/app/libs/prismadb";
import { PathParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";

// create interface for fetching the properties

export interface IListingParams {
  userId?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    const { userId } = params;
    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
