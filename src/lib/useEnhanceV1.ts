import { FileWithPath } from "@mantine/dropzone";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import FormData from "form-data";
import { base64ToImageFile } from "../utils/base64ToImageFile";

interface EnhanceResponse {
  processed_image: string;
}

export function useEnhanceV1() {
  return useMutation({
    mutationFn: async ({
      image,
      a,
      b,
    }: {
      image: FileWithPath;
      a: number;
      b: number;
    }): Promise<File> => {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("a", a);
      formData.append("b", b);
      const host = import.meta.env.VITE_HOST;

      const response = await axios.post<EnhanceResponse>(
        `${host}/api/enhance_v1`,
        formData,
        {
          headers: {
            Accept: "*/*",
          },
          maxBodyLength: Infinity,
        }
      );

      if (!response.data?.processed_image) {
        throw new Error("No processed image received from server");
      }

      return base64ToImageFile(
        response.data.processed_image,
        `enhanced_v1?a=${a}&b=${b}.png`
      );
    },
    onError: (error) => {
      console.error("Error processing image:", error);
      throw new Error(
        error instanceof Error
          ? `Failed to process image: ${error.message}`
          : "Failed to process image"
      );
    },
  });
}
