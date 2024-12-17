import { ActionIcon, Box, Group, Indicator, Image as MantineImage, Title, } from '@mantine/core';
import { DropzoneButton } from './dropZone';
import { FileWithPath } from '@mantine/dropzone';
import { IconX } from '@tabler/icons-react';



type ImageProcessingPlaygroundProps = {
    onDrop: (acceptedFiles: FileWithPath[]) => void,
    targetImage: FileWithPath[],
    setFiles: React.Dispatch<React.SetStateAction<FileWithPath[]>>

}

export default function ImageProcessingPlayground({ onDrop, targetImage, setFiles }: ImageProcessingPlaygroundProps) {

    const handleRemoveImage = (idx: number) => {
        const filteredImages = targetImage;
        setFiles(filteredImages.filter((_, imageIdx) => idx !== imageIdx))
    }


    const previews = targetImage.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (<Indicator key={`${file.path}-${index}`} color="transparent" label={<ActionIcon
            onClick={() => { handleRemoveImage(index) }}
        >
            <IconX></IconX>
        </ActionIcon>}

        > <Box p={30}>
                <MantineImage  key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />
                <Title order={4} style={{ textAlign: 'center' }} >
                    {file.name.split(".")[0]} {index == 0 ? "(Input)" : ""}
                </Title>
            </Box>
        </Indicator>
        )
    });


    return (
        <Box >


            {targetImage.length < 1 ? <DropzoneButton dropZoneProps={{ onDrop: onDrop }} /> :

                <Group justify='center' mx={'auto'} mt={'lg'} >
                    {previews}
                </Group>

            }


        </Box>
    );
}

