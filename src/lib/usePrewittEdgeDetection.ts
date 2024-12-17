import { FileWithPath } from "@mantine/dropzone";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import FormData from "form-data";
import { base64ToImageFile } from "../utils/base64ToImageFile";

interface Response {
  processed_image: string;
}

export function usePrewittEdgeDetection() {
  return useMutation({
    mutationFn: async ({ image }: { image: FileWithPath }): Promise<File> => {
      const formData = new FormData();
      formData.append("image", image);
      const host = import.meta.env.VITE_HOST;

      const response = await axios.post<Response>(
        `${host}/api/prewitt_edge_detection`,
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

      return base64ToImageFile(
        response.data.processed_image,
        `prewitt_edge_detection.png`
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
