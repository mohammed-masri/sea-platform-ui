"use client";
import { useSearchParams } from "next/navigation";

/**
 * Gets a query parameter value.
 *
 * @param name - The name of the query parameter to get.
 */
export function useGetQueryParam() {
  const searchParams = useSearchParams();

  return (name: string) => {
    if (!searchParams) return;

    return searchParams.get(name);
  };
}
