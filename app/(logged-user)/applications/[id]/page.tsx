"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ApplicationPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    router.push(`/applications/${params.id}/update`);
  }, [router, params]);

  return <div></div>;
}
