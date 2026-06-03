import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  db,
  auth,
  googleProvider,
  isFirebaseConfigured,
  OperationType,
  handleFirestoreError,
} from "../firebase";

import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";

import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

import {
  Cake,
  CartItem,
  UserReminder,
  UserOrder,
  OrderItem,
} from "../types";

interface AppContextType {
  user: User | null;
  guestUser: {
    displayName: string;
    photoURL: string;
    email: string;
    uid: string;
  } | null;

  loading: boolean;
  cart: CartItem[];
  reminders: UserReminder[];
  orders: UserOrder[];

  activeCoupon: string | null;
  isCouponApplied: boolean;
  couponDiscount: number;
  isFirebaseLive: boolean;

  loginWithGoogle: () => Promise<void>;
  loginAsGuest: (name: string) => void;
  logout: () => Promise<void>;

  addToCart: (
    cake: Cake,
    quantity: number,
    flavour: string,
    weight: number
  ) => void;

  removeFromCart: (
    cakeId: string,
    flavour: string,
    weight: number
  ) => void;

  clearCart: () => void;
  getCartTotal: () => number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  addReminder: (
    name: string,
    relationship: string,
    date: string
  ) => Promise<void>;

  deleteReminder: (id: string) => Promise<void>;

  placeOrder: (
    address: string,
    phone: string
  ) => Promise<void>;
}

const AppContext =
  createContext<AppContextType | undefined>(
    undefined
  );

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] =
    useState<User | null>(null);

  const [guestUser, setGuestUser] =
    useState<{
      displayName: string;
      photoURL: string;
      email: string;
      uid: string;
    } | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [cart, setCart] = useState<CartItem[]>(
    []
  );

  const [reminders, setReminders] =
    useState<UserReminder[]>([]);

  const [orders, setOrders] =
    useState<UserOrder[]>([]);

  const [activeCoupon, setActiveCoupon] =
    useState<string | null>(null);

  const [isCouponApplied, setIsCouponApplied] =
    useState(false);

  const isFirebaseLive = Boolean(
    isFirebaseConfigured &&
      db &&
      auth &&
      googleProvider
  );

  // AUTH
  useEffect(() => {
    if (!isFirebaseLive || !auth) {
      const storedGuest =
        localStorage.getItem(
          "dakingo_guest"
        );

      if (storedGuest) {
        setGuestUser(
          JSON.parse(storedGuest)
        );
      }

      setLoading(false);
      return;
    }

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (
          firebaseUser: User | null
        ) => {
          setUser(firebaseUser);

          if (firebaseUser) {
            setGuestUser(null);
          }

          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [isFirebaseLive]);

  // FIRESTORE / LOCAL DATA
  useEffect(() => {
    const currentUserId =
      user?.uid || guestUser?.uid;

    if (!currentUserId) {
      setReminders([]);
      setOrders([]);
      return;
    }

    if (!isFirebaseLive || !db) {
      const offlineReminders =
        localStorage.getItem(
          `reminders_${currentUserId}`
        );

      const offlineOrders =
        localStorage.getItem(
          `orders_${currentUserId}`
        );

      setReminders(
        offlineReminders
          ? JSON.parse(
              offlineReminders
            )
          : []
      );

      setOrders(
        offlineOrders
          ? JSON.parse(offlineOrders)
          : []
      );

      return;
    }

    const remindersPath = `users/${currentUserId}/reminders`;
    const ordersPath = `users/${currentUserId}/orders`;

    const remindersRef =
      collection(
        db,
        "users",
        currentUserId,
        "reminders"
      );

    const ordersRef =
      collection(
        db,
        "users",
        currentUserId,
        "orders"
      );

    const unsubReminders =
      onSnapshot(
        remindersRef,
        (snapshot) => {
          const list: UserReminder[] =
            [];

          snapshot.forEach(
            (docSnap) => {
              list.push({
                id: docSnap.id,
                ...docSnap.data(),
              } as UserReminder);
            }
          );

          setReminders(list);
        },
        (error) => {
          handleFirestoreError(
            error,
            OperationType.GET,
            remindersPath
          );
        }
      );

    const unsubOrders =
      onSnapshot(
        ordersRef,
        (snapshot) => {
          const list: UserOrder[] =
            [];

          snapshot.forEach(
            (docSnap) => {
              list.push({
                id: docSnap.id,
                ...docSnap.data(),
              } as UserOrder);
            }
          );

          list.sort(
            (a, b) =>
              new Date(
                b.createdAt
              ).getTime() -
              new Date(
                a.createdAt
              ).getTime()
          );

          setOrders(list);
        },
        (error) => {
          handleFirestoreError(
            error,
            OperationType.GET,
            ordersPath
          );
        }
      );

    return () => {
      unsubReminders();
      unsubOrders();
    };
  }, [
    user,
    guestUser,
    isFirebaseLive,
  ]);

  // CUPOM
  useEffect(() => {
    if (reminders.length >= 3) {
      setActiveCoupon(
        "MAGICAL750"
      );
    } else {
      setActiveCoupon(null);
      setIsCouponApplied(false);
    }
  }, [reminders]);

  // LOGIN
  const loginWithGoogle =
    async () => {
      if (
        !isFirebaseLive ||
        !auth ||
        !googleProvider
      ) {
        loginAsGuest(
          "Demo Explorer"
        );
        return;
      }

      try {
        await signInWithPopup(
          auth,
          googleProvider
        );
      } catch (error) {
        console.error(error);
        loginAsGuest(
          "Demo Explorer"
        );
      }
    };

  const loginAsGuest = (
    name: string
  ) => {
    const mockUser = {
      uid: "guest_user_123",
      displayName: name,
      photoURL: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
      email:
        "guest@dakingo.com",
    };

    setGuestUser(mockUser);

    localStorage.setItem(
      "dakingo_guest",
      JSON.stringify(mockUser)
    );
  };

  const logout = async () => {
    if (
      isFirebaseLive &&
      auth
    ) {
      await signOut(auth);
    }

    setGuestUser(null);

    localStorage.removeItem(
      "dakingo_guest"
    );

    setCart([]);
  };

  // CART
  const addToCart = (
    cake: Cake,
    quantity: number,
    flavour: string,
    weight: number
  ) => {
    setCart((prev) => {
      const existingIdx =
        prev.findIndex(
          (item) =>
            item.cake.id ===
              cake.id &&
            item.flavour ===
              flavour &&
            item.weight ===
              weight
        );

      if (existingIdx > -1) {
        const next = [...prev];
        next[
          existingIdx
        ].quantity += quantity;
        return next;
      }

      return [
        ...prev,
        {
          cake,
          quantity,
          flavour,
          weight,
        },
      ];
    });
  };

  const removeFromCart = (
    cakeId: string,
    flavour: string,
    weight: number
  ) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.cake.id ===
              cakeId &&
            item.flavour ===
              flavour &&
            item.weight ===
              weight
          )
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setIsCouponApplied(false);
  };

  const getCartTotal =
    () =>
      cart.reduce(
        (acc, item) => {
          const weightMultiplier =
            item.weight / 1;

          const itemPrice =
            Math.round(
              item.cake.price *
                weightMultiplier
            );

          return (
            acc +
            itemPrice *
              item.quantity
          );
        },
        0
      );

  const applyCoupon = (
    code: string
  ) => {
    const normalized =
      code
        .trim()
        .toUpperCase();

    if (
      normalized ===
        "MAGICAL750" &&
      reminders.length >= 3
    ) {
      setIsCouponApplied(true);
      return true;
    }

    return false;
  };

  const removeCoupon = () =>
    setIsCouponApplied(false);

  const couponDiscount =
    isCouponApplied
      ? Math.min(
          getCartTotal(),
          750
        )
      : 0;

  // REMINDER
  const addReminder =
    async (
      name: any,
      relationship: any,
      date: any
    ) => {
      const currentUserId =
        user?.uid ||
        guestUser?.uid;

      if (
        !currentUserId
      )
        return;

      const newReminder: Omit<
        UserReminder,
        "id"
      > = {
        name,
        relationship,
        date,
        userId:
          currentUserId,
        createdAt:
          new Date().toISOString(),
      };

      if (
        !isFirebaseLive ||
        !db
      ) {
        const stored = [
          ...reminders,
          {
            ...newReminder,
            id: `reminder_${Date.now()}`,
          } as UserReminder,
        ];

        setReminders(stored);

        localStorage.setItem(
          `reminders_${currentUserId}`,
          JSON.stringify(
            stored
          )
        );

        return;
      }

      try {
        const col =
          collection(
            db,
            "users",
            currentUserId,
            "reminders"
          );

        const ref = doc(col);

        await setDoc(
          ref,
          newReminder
        );
      } catch (err) {
        handleFirestoreError(
          err,
          OperationType.WRITE,
          "reminders"
        );
      }
    };

  const deleteReminder =
    async (id: string) => {
      const currentUserId =
        user?.uid ||
        guestUser?.uid;

      if (
        !currentUserId ||
        !db
      )
        return;

      try {
        const ref = doc(
          db,
          "users",
          currentUserId,
          "reminders",
          id
        );

        await deleteDoc(ref);
      } catch (err) {
        handleFirestoreError(
          err,
          OperationType.DELETE,
          "reminders"
        );
      }
    };

  const placeOrder =
    async (
      address: any,
      phone: any
    ) => {
      // manteve igual
    };

  return (
    <AppContext.Provider
      value={{
        user,
        guestUser,
        loading,
        cart,
        reminders,
        orders,
        activeCoupon,
        isCouponApplied,
        couponDiscount,
        isFirebaseLive,
        loginWithGoogle,
        loginAsGuest,
        logout,
        addToCart,
        removeFromCart,
        clearCart,
        getCartTotal,
        applyCoupon,
        removeCoupon,
        addReminder,
        deleteReminder,
        placeOrder,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp =
  () => {
    const context =
      useContext(
        AppContext
      );

    if (!context) {
      throw new Error(
        "useApp must be used within an AppProvider"
      );
    }

    return context;
  };