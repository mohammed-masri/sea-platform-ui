"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeAlert, selectAlerts } from "@/store/slices/alert/slice";
import { Alert } from "sea-react-components";

export default function AlertHandler() {
  const alerts = useAppSelector(selectAlerts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const alertCount = alerts.length;

    // Create timeouts to remove alerts from last to first
    const timeouts = alerts.map((_, index) => {
      const delay = (alertCount - index) * 5000; // Last alert gets smallest delay
      return setTimeout(() => {
        dispatch(removeAlert(alertCount - 1 - index)); // Remove last alert first
      }, delay);
    });

    // Clear timeouts if the component unmounts or alerts change
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [alerts, dispatch]);

  return (
    <div className="flex flex-col gap-3">
      {alerts.map((a, i) => (
        <Alert
          key={`global-alert-${i}`}
          message={a.message}
          type={a.type}
          theme={a.theme}
          handleClickCloseButton={() => {
            dispatch(removeAlert(i));
          }}
        />
      ))}
    </div>
  );
}
