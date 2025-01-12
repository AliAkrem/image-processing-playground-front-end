import "@mantine/core/styles.css";
import '@mantine/dropzone/styles.css';
import '@mantine/nprogress/styles.css';
import { AppShell, Burger, Button, Flex, Group, MantineProvider, NumberInput, ScrollArea, SimpleGrid, Slider, Text, Title } from "@mantine/core";
import { theme } from "./theme";
import ImageProcessingPlayground from "./components/ImageProcessingPlayground";
import { useDisclosure } from "@mantine/hooks";
import { useImageProcessing } from "./hooks/useImageProcessing";
import { NavigationProgress } from "@mantine/nprogress";




export default function App() {




  const {
    applyGaussianNoise,
    applySaltAndPepperNoise,
    onDrop,
    targetImage,
    setFiles,
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
    laplacianEdgeDetection

  } = useImageProcessing();



  const [opened, { toggle }] = useDisclosure();

  return (<>

    <MantineProvider theme={theme} forceColorScheme="dark" >
      <NavigationProgress />

      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 400, breakpoint: 'sm', collapsed: { mobile: !opened } }}
        padding="md"
      >
        <AppShell.Header >
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Title  >
              Image Processing Playground
            </Title>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md"  >
          <ScrollArea scrollbarSize={'0'} >
            <Title order={3}>Settings</Title>

            <SimpleGrid cols={2} mt={'md'} >
              <Button onClick={applyGaussianNoise}>Gaussian Noise</Button>
              <Button onClick={applySaltAndPepperNoise}>Salt & Pepper</Button>
              <Button onClick={enhance_v1} >enhance v1</Button>
              <Button onClick={enhance_v2} >enhance v2</Button>
              <Button onClick={gaussianFilter} > gaussian Filter</Button>
              <Button onClick={averageFilter} > average Filter</Button>
              <Button onClick={minFilter} > min Filter</Button>
              <Button onClick={maxFilter} > max Filter</Button>
              <Button onClick={midianFilter} > midian Filter</Button>
              <Button onClick={nagaoFilter} >nagao Filter</Button>
              <Button onClick={prewittEdgeDetection} >prewitt edge</Button>
              <Button onClick={laplacianEdgeDetection} >laplacian edge</Button>


            </SimpleGrid>
            <Flex gap={'md'} >
              <NumberInput
                label="a"

                min={0}
                allowNegative={false}
                value={a}
                onChange={(newValue) => setA(Number(newValue))}
              />
              <NumberInput
                label="b"
                min={0}
                allowNegative={false}
                value={b}
                onChange={(newValue) => setB(Number(newValue))}
              />

            </Flex>
            <Flex gap={'md'} >
              <NumberInput
                label="sigma"

                min={0}
                allowNegative={false}
                value={sigma}
                decimalScale={1}
                decimalSeparator=","
                onChange={(newValue) => setSigma(String(newValue))}
              />
              <NumberInput
                label="filter size"
                min={0}
                allowNegative={false}
                value={filterSize}
                onChange={(newValue) => setFilterSize(Number(newValue))}
              />

            </Flex>



            <Text pt={'xs'}>seuillage</Text>
            <Slider

              py={'md'}
              value={s}
              onChange={(event) => setS(event.currentTarget)}
              defaultValue={5}
              step={5}
              styles={{ markLabel: { display: 'none' } }}
            />


          </ScrollArea>
        </AppShell.Navbar>

        <AppShell.Main>
          <ImageProcessingPlayground {...{ onDrop, targetImage, setFiles }} />
        </AppShell.Main>
      </AppShell>


    </MantineProvider >

  </>);
}
