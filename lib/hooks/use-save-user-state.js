import { useState, useEffect } from 'react';

const useSaveUserState = (state, session) => {
  const [Data, setProfileData] = useState(null);
  const [saving, setSaving] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session) {
      setSaving(false);
      return;
    }

    const fetchProfileData = async () => {
      setSaving(true);
      try {
        const response = await fetch('/api/savestate', {
          method: 'POST',
          body: JSON.stringify(state),
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        setError(error);
      } finally {
        setSaving(false);
      }
    };

    fetchProfileData();
  }, [session]);

  return { Data, saving, error };
};

export default useSaveUserState;
