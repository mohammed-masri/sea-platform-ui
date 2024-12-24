"use client";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect } from "react";

export default function AccountPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    router.push(`/accounts/${params.id}/update`);
  }, [router, params]);

  return <div></div>;
}
