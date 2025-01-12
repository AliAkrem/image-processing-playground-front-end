import { useState, useEffect } from "react";

import { FileWithPath } from "@mantine/dropzone";
import { useGaussianNoise } from "../lib/useAddGaussianNoise";
import { nprogress } from "@mantine/nprogress";
import { useSaltPepperNoise } from "../lib/useAddSaltPepperNoise";
import { useEnhanceV2 } from "../lib/useEnhanceV2";
import { useEnhanceV1 } from "../lib/useEnhanceV1";
import { useGaussianFilter } from "../lib/useGaussianFilter";
import { useAverageFilter } from "../lib/useAverageFilter";
import { useMaxFilter } from "../lib/useMaxFilter";
import { useMidianFilter } from "../lib/useMidianFilter";
import { useMinFilter } from "../lib/useMinFilter";
import { useNagaoFilter } from "../lib/useNagaoFilter";
import { usePrewittEdgeDetection } from "../lib/usePrewittEdgeDetection";
import { useLaplacianEdgeDetection } from "../lib/useLaplacianEdgeDetection";
import {  useDebouncedValue } from "@mantine/hooks";

export function useImageProcessing() {
  const {
    mutateAsync: addGaussianNoiseMutateAsync,
    isPending: addGaussianNoisePending,
    isSuccess: addGaussianNoiseSuccess,
  } = useGaussianNoise();

  const {
    mutateAsync: addSaltPepperNoiseMutateAsync,
    isPending: addSaltPepperNoisePending,
    isSuccess: addSaltPepperNoiseSuccess,
  } = useSaltPepperNoise();

  const {
    mutateAsync: enhanceV2MutateAsync,
    isPending: enhanceV2Pending,
    isSuccess: enhanceV2Success,
  } = useEnhanceV2();

  const {
    mutateAsync: enhanceV1MutateAsync,
    isPending: enhanceV1Pending,
    isSuccess: enhanceV1Success,
  } = useEnhanceV1();

  const {
    mutateAsync: gaussianFilterMutateAsync,
    isPending: gaussianFilterPending,
    isSuccess: gaussianFilterSuccess,
  } = useGaussianFilter();

  const {
    mutateAsync: averageFilterMutateAsync,
    isPending: averageFilterPending,
    isSuccess: averageFilterSuccess,
  } = useAverageFilter();

  const {
    mutateAsync: maxFilterMutateAsync,
    isPending: maxFilterPending,
    isSuccess: maxFilterSuccess,
  } = useMaxFilter();

  const {
    mutateAsync: minFilterMutateAsync,
    isPending: minFilterPending,
    isSuccess: minFilterSuccess,
  } = useMinFilter();

  const {
    mutateAsync: midianFilterMutateAsync,
    isPending: midianFilterPending,
    isSuccess: midianFilterSuccess,
  } = useMidianFilter();

  const {
    mutateAsync: nagaoFilterMutateAsync,
    isPending: nagaoFilterPending,
    isSuccess: nagaoFilterSuccess,
  } = useNagaoFilter();

  const {
    mutateAsync: prewittEdgeDetectionMutateAsync,
    isPending: prewittEdgeDetectionPending,
    isSuccess: prewittEdgeDetectionSuccess,
  } = usePrewittEdgeDetection();

  const {
    mutateAsync: laplacianEdgeDetectionMutateAsync,
    isPending: laplacianEdgeDetectionPending,
    isSuccess: laplacianEdgeDetectionSuccess,
  } = useLaplacianEdgeDetection();

  //
  const [noiseAmount, setNoiseAmount] = useState(0.5);
  const [filterStrength, setFilterStrength] = useState(3);
  const [a, setA] = useState(100);
  const [b, setB] = useState(40);

  const [s, setS] = useState(20);
  const [debouncedS] = useDebouncedValue(s, 300);

  const [sigma, setSigma] = useState((0.8).toFixed(1));
  const [filterSize, setFilterSize] = useState(3);

  const [targetImage, setFiles] = useState<FileWithPath[]>([]);

  useEffect(() => {
    const pending =
      addGaussianNoisePending ||
      addSaltPepperNoisePending ||
      enhanceV1Pending ||
      enhanceV2Pending ||
      maxFilterPending ||
      minFilterPending ||
      averageFilterPending ||
      midianFilterPending ||
      nagaoFilterPending ||
      prewittEdgeDetectionPending ||
      laplacianEdgeDetectionPending;

    const success =
      addGaussianNoiseSuccess ||
      addSaltPepperNoiseSuccess ||
      enhanceV1Success ||
      enhanceV2Success ||
      maxFilterSuccess ||
      minFilterSuccess ||
      averageFilterSuccess ||
      midianFilterSuccess ||
      gaussianFilterSuccess ||
      nagaoFilterSuccess ||
      prewittEdgeDetectionSuccess ||
      laplacianEdgeDetectionSuccess;
    if (pending) nprogress.start();
    else if (success) {
      nprogress.complete();
      nprogress.reset();
    }

    () => {
      nprogress.cleanup();
    };
  }, [
    addGaussianNoisePending,
    addSaltPepperNoisePending,
    enhanceV1Pending,
    enhanceV2Pending,
    gaussianFilterPending,
    averageFilterPending,
    minFilterPending,
    maxFilterPending,
    midianFilterPending,
    nagaoFilterPending,
    prewittEdgeDetectionPending,
  ]);

  useEffect(() => {

    console.log('useEffect hit')

    laplacianEdgeDetection();

  }, [debouncedS]);



  const onDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  };

  const applyGaussianNoise = async () => {
    if (targetImage.length == 0) return;

    const output = await addGaussianNoiseMutateAsync(targetImage[0]);

    setFiles(() => [...targetImage, output as FileWithPath]);
  };

  const applySaltAndPepperNoise = async () => {
    if (targetImage.length == 0) return;

    const output = await addSaltPepperNoiseMutateAsync(targetImage[0]);

    setFiles(() => [...targetImage, output as FileWithPath]);
  };

  const enhance_v2 = async () => {
    if (targetImage.length == 0) return;

    const output = await enhanceV2MutateAsync({
      image: targetImage[0],
      a: a,
      b: b,
    });

    setFiles(() => [...targetImage, output as FileWithPath]);
  };

  const enhance_v1 = async () => {
    if (targetImage.length == 0) return;

    const output = await enhanceV1MutateAsync({
      image: targetImage[0],
      a: a,
      b: b,
    });

    setFiles(() => [...targetImage, output as FileWithPath]);
  };

  const gaussianFilter = async () => {
    if (targetImage.length == 0) return;

    console.log(sigma);

    const output = await gaussianFilterMutateAsync({
      image: targetImage[0],
      sigma: sigma,
      filterSize: filterSize,
    });

    setFiles(() => [...targetImage, output as FileWithPath]);
  };

  const averageFilter = async () => {
    if (targetImage.length == 0) return;
    const output = await averageFilterMutateAsync({
      image: targetImage[0],
    });

    setFiles(() => [...targetImage, output as FileWithPath]);
  };

  const minFilter = async () => {
    if (targetImage.length == 0) return;
    const output = await minFilterMutateAsync({
      image: targetImage[0],
    });

    setFiles(() => [...targetImage, output as FileWithPath]);
  };
  const maxFilter = async () => {
    if (targetImage.length == 0) return;
    const output = await maxFilterMutateAsync({
      image: targetImage[0],
    });

    setFiles(() => [...targetImage, output as FileWithPath]);
  };

  const midianFilter = async () => {
    if (targetImage.length == 0) return;
    const output = await midianFilterMutateAsync({
      image: targetImage[0],
    });
       {/* <NumberInput
              label="souaillage"
              min={0}
              allowNegative={false}
              value={filterSize}
              onChange={(newValue) => setFilterSize(Number(newValue))}
            /> */}
    setFiles(() => [...targetImage, output as FileWithPath]);
  };

  const nagaoFilter = async () => {
    if (targetImage.length == 0) return;
    const output = await nagaoFilterMutateAsync({
      image: targetImage[0],
    });

    setFiles(() => [...targetImage, output as FileWithPath]);
  };

  const prewittEdgeDetection = async () => {
    if (targetImage.length == 0) return;
    const output = await prewittEdgeDetectionMutateAsync({
      image: targetImage[0],
    });

    setFiles(() => [...targetImage, output as FileWithPath]);
  };

  const laplacianEdgeDetection = async () => {
    if (targetImage.length == 0) return;

    const output = await laplacianEdgeDetectionMutateAsync({
      image: targetImage[0],
      s: debouncedS,
    });

    setFiles(() => [...targetImage, output as FileWithPath]);
  };

  return {
    targetImage,
    noiseAmount,
    filterStrength,
    setNoiseAmount,
    setFilterStrength,
    applyGaussianNoise,
    applySaltAndPepperNoise,
    onDrop,
    setFiles,
    addGaussianNoisePending,
    addGaussianNoiseSuccess,
    enhance_v1,
    enhance_v2,
    setA,
    setB,
    setS,
    a,
    b,
    s,
    sigma,
    filterSize,
    setSigma,
    setFilterSize,
    gaussianFilter,
    averageFilter,
    minFilter,
    maxFilter,
    midianFilter,
    nagaoFilter,
    prewittEdgeDetection,
    laplacianEdgeDetection,
  };
}
