import { useEffect } from 'react';
import { auth } from '../firebase';
import { useAppDispatch } from './redux_hooks';
import { fetchUserRole, setError, setValue } from './slices/auth';

export function useAuthStateEffect() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(
      async (user) => {
        if (user !== null) dispatch(fetchUserRole(user));
        dispatch(setValue(user?.toJSON()));
      },
      (error) => dispatch(setError(error))
    );
    return unsubscribe;
  }, []);
}