import { FileWithPath } from "@mantine/dropzone";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import FormData from "form-data";
import { base64ToImageFile } from "../utils/base64ToImageFile";

interface Response {
  processed_image: string;
}

export function useLaplacianEdgeDetection() {
  return useMutation({

    mutationFn: async ({ image, s }: { image: FileWithPath, s : number }): Promise<File> => {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("s", s);

      const host = import.meta.env.VITE_HOST;

      const response = await axios.post<Response>(
        `${host}/api/laplacian_edge_detection`,
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
        `laplacian_edge_detection__s=${s}.png`
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