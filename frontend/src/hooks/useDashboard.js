import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

export const useFetchUserForms = (initialForms = null) => {
  const [forms, setForms] = useState(initialForms && Array.isArray(initialForms) ? initialForms : []);
  const [loading, setLoading] = useState(initialForms ? false : true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        // If caller prefetched forms (initialForms), don't clear them
        if (isMounted) {
          if (!initialForms) {
            setForms([]);
            setLoading(false);
          }
        }
        return;
      }

      try {
        const idToken = await user.getIdToken();
        const res = await axios.get("http://127.0.0.1:8000/api/exam-bill/user/", {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        
        if (isMounted) {
          setForms(Array.isArray(res.data) ? res.data : []);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching forms:", err);
        // if token used too early, try one retry after short delay with forced refresh
        const serverMsg = err?.response?.data?.error || err?.message || '';
        if (typeof serverMsg === 'string' && serverMsg.includes('Token used too early')) {
          try {
            await new Promise((r) => setTimeout(r, 1000));
            const idToken2 = await user.getIdToken(true);
            const res2 = await axios.get("http://127.0.0.1:8000/api/exam-bill/user/", {
              headers: { Authorization: `Bearer ${idToken2}` },
            });
            if (isMounted) {
              setForms(Array.isArray(res2.data) ? res2.data : []);
              setError(null);
            }
            return;
          } catch (err2) {
            console.error('Retry failed in useFetchUserForms:', err2);
          }
        }
        if (isMounted) {
          setError(err.message);
          setForms([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  return { forms, loading, error };
};

export const useAuthUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return user;
};
