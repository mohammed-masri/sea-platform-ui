"use client";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Updates or adds a query parameter and preserves existing ones.
 *
 * @param name - The name of the query parameter to update.
 * @param value - The value to set for the query parameter.
 */
export function useUpdateQueryParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (updates: Record<string, string>) => {
    if (!searchParams || !router) return;

    // Get the current query params as an object
    const currentParams = new URLSearchParams(searchParams.toString());

    // Apply all updates
    Object.entries(updates).forEach(([key, value]) => {
      currentParams.set(key, value);
    });

    // Construct the new URL with updated query params
    const newQueryString = currentParams.toString();

    // Push the updated URL
    router.push(`?${newQueryString}`);
  };

  // return (name: string, value: string) => {
  //   if (!searchParams || !router) return;

  //   console.log("-------------\nupdate query\n", name, " --- ", value);

  //   // Get the current query params as an object
  //   const currentParams = new URLSearchParams(searchParams.toString());

  //   console.log("currentParams: ", currentParams);

  //   // Update or add the new param
  //   currentParams.set(name, value);

  //   // Construct the new URL with updated query params
  //   const newQueryString = currentParams.toString();

  //   console.log("newQueryString: ", newQueryString);

  //   console.log("-------------");

  //   // Push the updated URL
  //   router.push(`?${newQueryString}`);
  // };
}
