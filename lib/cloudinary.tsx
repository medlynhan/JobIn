"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useCallback, useRef } from "react";

type CloudinarySource = "local" | "camera" | "url" | "image_search" | "facebook" | "instagram" | "shutterstock" | "istock" | "gettyimages" | "unsplash" | "dropbox" | "google_drive";

export function useCloudinaryUploadWidget(options?: {
  folder?: string;
  sources?: CloudinarySource[];
}) {
  const widgetRef = useRef<any>(null);
  const resolverRef = useRef<((url: string | null) => void) | null>(null);

  const open = useCallback(() => {
    if (widgetRef.current) widgetRef.current.open();
  }, []);

  const Widget = (
    props: {
      onUploaded?: (url: string) => void;
      children?: React.ReactNode;
    }
  ) => (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary/sign"
      options={{
        folder: options?.folder,
        sources: (options?.sources as CloudinarySource[] | undefined) ?? (["local", "camera"] as CloudinarySource[]),
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={(result, { widget }) => {
        const info = (result?.info as any) || {};
        const url = info.secure_url || info.url || null;
        if (url) {
          props.onUploaded?.(url);
          resolverRef.current?.(url);
        } else {
          resolverRef.current?.(null);
        }
        widget.close();
      }}
      onError={(error) => {
        console.error("Cloudinary widget error", error);
        resolverRef.current?.(null);
      }}
      onOpen={(widget) => {
        widgetRef.current = widget;
      }}
    >
      {() => props.children || null}
    </CldUploadWidget>
  );

  const openAndWait = useCallback(async (): Promise<string | null> => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;
      if (widgetRef.current) widgetRef.current.open();
    });
  }, []);

  return { Widget, open, openAndWait };
}
