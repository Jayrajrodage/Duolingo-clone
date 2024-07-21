import { Header } from "@/components/Header";
import { Items } from "@/components/Shop/Items";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Spinner } from "@/components/ui/Spinner";
import usePurchase from "@/hooks/User/usePurchase";
import useUserProgress from "@/hooks/User/useUserProgress";
import dropin from "braintree-web-drop-in";
import {
  IonContent,
  IonImg,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  useIonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { supabase } from "@/supabaseClient";
import { useUserContext } from "@/ContextApi/UserContext";
const Shop: React.FC = () => {
  const {
    loading,
    points,
    hearts,
    GetCourses: refetchUserProgress,
  } = useUserProgress();
  const [toast] = useIonToast();
  const { user } = useUserContext();
  const { SubScription, GetUserSubscription } = usePurchase();
  const [Hearts, setHearts] = useState(hearts);
  const [Points, setPoints] = useState(points);
  const [Loading, setLoading] = useState<boolean>();
  const [braintreeInstance, setbraintreeInstance] = useState<any>();
  useEffect(() => {
    setHearts(hearts);
    setPoints(points);
  }, [hearts, points, SubScription]);
  const handleRefresh = async (event: CustomEvent) => {
    await refetchUserProgress();
    event.detail.complete();
  };

  const onUpgrade = async () => {
    setLoading(true);
    try {
      dropin.create(
        {
          authorization: import.meta.env.VITE_BRAINTREE_AUTH_KEY, // insert your tokenization key or client token here
          container: "#braintree-drop-in-div",
          //paypal: { flow: "checkout", amount: 20 },
        },
        function (error, instance) {
          if (error) console.error(error);
          else setbraintreeInstance(instance);
        }
      );
    } catch (error) {
      console.log("🚀 ~ onUpgrade ~ error:", error);
    }
  };

  const OnPurchase = () => {
    try {
      if (braintreeInstance) {
        braintreeInstance.requestPaymentMethod(
          async (error: any, payload: any) => {
            if (error) {
              console.error(error);
            } else {
              const paymentMethodNonce = payload.nonce;
              console.log("payment method nonce", payload.nonce);
              const { error: insertError } = await supabase
                .from("userSubscription")
                .insert({
                  userId: user.id,
                  SubscriptionId: paymentMethodNonce,
                  Amount: 20,
                });

              if (insertError) {
                throw insertError;
              }
              await GetUserSubscription();
              setLoading(false);
              toast(`Payment completed`);
            }
          }
        );
      }
    } catch (error) {
      console.log("🚀 ~ OnPurchase ~ error:", error);
    }
  };
  return (
    <>
      <Sidebar />
      <IonPage id="main-content">
        <Header
          showMenuButton={true}
          ReRender={Points!}
          hasActiveSubscription={SubScription}
        />
        <IonContent className="ion-padding">
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent />
          </IonRefresher>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="flex w-full flex-col items-center">
                <IonImg
                  src="/shop.svg"
                  alt="Shop"
                  className="h-[90px] w-[90px]"
                />
                <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
                  Shop
                </h1>
                <p className="mb-6 text-center text-lg text-muted-foreground">
                  Spend your points on cool stuff.
                </p>
                {Hearts && Points && (
                  <>
                    <Items
                      hearts={Hearts}
                      points={Points}
                      hasActiveSubscription={!!SubScription?.isActive}
                      setHearts={setHearts}
                      setPoints={setPoints}
                      onUpgrade={onUpgrade}
                      Loading={Loading}
                      OnPurchase={OnPurchase}
                    />
                  </>
                )}
              </div>
            </>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Shop;
