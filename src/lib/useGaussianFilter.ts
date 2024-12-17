import { FileWithPath } from "@mantine/dropzone";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import FormData from "form-data";
import { base64ToImageFile } from "../utils/base64ToImageFile";

interface Response {
  processed_image: string;
}

export function useGaussianFilter() {
  return useMutation({
    mutationFn: async ({
      image,
      sigma,
      filterSize,
    }: {
      image: FileWithPath;
      sigma: string;
      filterSize: number;
    }): Promise<File> => {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("sigma", Number(sigma).toFixed(1));
      formData.append("filter_size", filterSize);
      const host = import.meta.env.VITE_HOST;

      const response = await axios.post<Response>(
        `${host}/api/gaussian_filter`,
        formData,
        {
          headers: {
            Accept: "*/*",
          },
          maxBodyLength: Infinity,
          timeout: 30000,
        }
      );

      if (!response.data?.processed_image) {
        throw new Error("No processed image received from server");
      }

      console.log({sigma});
      const tag = `gaussian_filter&filter_size=${filterSize}&sigma=${sigma.replace(".", ",")}.png`;

      console.log('Tag:', tag);

      return base64ToImageFile(response.data.processed_image, tag);
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
