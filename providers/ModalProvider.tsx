"use client";
import Modal from "@/app/components/modals/Modal";
import AuthModal from "@/app/components/modals/auth-modal/AuthModal";
import SubscribeModal from "@/app/components/modals/subscribe-modal/SubscribeModal";
import UploadModal from "@/app/components/modals/upload-modal/UploadModal";
import { ProductWithPrice } from "@/types";
import { useEffect, useState } from "react";

interface ModalProviderProps{
  products: ProductWithPrice[];
}

const ModalProvider:React.FC<ModalProviderProps> = ({products}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <UploadModal />
      <SubscribeModal products={products}/>
    </>
  );
};

export default ModalProvider;
