import React from 'react';

type FormStatus = {
  loading: boolean;
  success: boolean;
  error: Error | null;
  setLoading: (loading: boolean) => void;
  setSuccess: (success: boolean) => void;
  setError: (error: Error | null) => void;
};

export function useFormStatus(): FormStatus {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  return { loading, success, error, setLoading, setSuccess, setError };
}
